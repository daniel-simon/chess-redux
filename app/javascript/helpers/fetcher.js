/*
  Fetcher is a wrapper for ES6's fetch method.  It automatically includes rails CSRF tokens and sends credentials.
  and provides four helper methods for ease of use: get, put, post, delete
  Each of these methods have the following signiture:
  Input:
    @param url - The url to hit with fetch
    @param data - A hash representing the params that will be sent to the server.  Depending on request type this will become a query string or body attribute
    @param headers - A hash with any additional headers to be included with the request.
  Output:
    @return An ES6 promise with the server's response
*/
import Promise from "promise-polyfill"
import "whatwg-fetch"

class Fetcher {
  // Optional Parameters:
  // error_handler: function to be called if a server side error occurs in the
  // request
  constructor(error_handler = null) {
    this.error_handler = error_handler
  }

  _generate_query_string(data, url, method) {
    const display_console_error = (data, url, method) => {
      console.error(`Invalid Fetcher params for: "${method} ${url}":`, data)
    }

    if (Array.isArray(data)) {
      display_console_error(data, url, method)
      throw new Error("Any params passed to Fetcher must be a plain object at the top level. You have passed an Array")
    } else if (typeof data !== "object") {
      display_console_error(data, url, method)
      throw new Error(
        `Any params passed to Fetcher must be a plain object at the top level. You have passed a variable with type "${typeof data}"`
      )
    }
    // define the recursive function for nested params
    const recursively_push_query_string_params = (key_substring, params_value, parent = {}) => {
      // this function takes a `key_substring` argument, rather than just a key, because the recursion's main purpose is to
      // build up long param names by appending substrings of each nested key. for example:
      // params = { object: { topkey: { nextkey: 'value' } } } => "object[topkey][nextkey]=value"
      // each level of nesting corresponds to this function calling itself another time and appending another `[key]` to the substring
      if (params_value != null) {
        if (typeof params_value !== "object") {
          query_string_params.push(`${encodeURIComponent(key_substring)}=${encodeURIComponent(params_value)}`)
        } else {
          if (Array.isArray(params_value)) {
            if (parent.type === "array") {
              display_console_error(data, url, method)
              throw new Error(
                "Rack currently does not support parsing directly nested arrays in params, so neither does Fetcher. Use `JSON.stringify()` and `JSON.parse()` to escape/parse the params object if this structure is required."
              )
            }
            for (let element of params_value) {
              recursively_push_query_string_params(`${key_substring}[]`, element, {
                type: "array",
                key_substring: `${key_substring}[]`
              })
            }
          } else {
            Object.keys(params_value).forEach((key, index, keys) => {
              recursively_push_query_string_params(`${key_substring}[${key}]`, params_value[key], { type: "object" })
              if (index == keys.length - 1 && parent.type === "array") {
                // [DS][119] ^ if this is the last key/value pair in the object we're iterating through,
                // and the parent object in this recursion is an array:
                query_string_params.push(`${encodeURIComponent(parent.key_substring)}`)
                // ^ this inserts a "blank" param value for the parent array after the last key/value
                // pair in the object: "...&parent_array[]&..." (NO equals sign, so nothing is added to params).
                // this is essentially equivalent to a `}` explicitly denoting the end of the hash/object.
                // it allows for a structure like:
                //   object_list: [
                //     { key1: 1 },
                //     { key2: 2 }
                //   ]
                // to be passed via params -- an array with two elements, each with only one key/value pair.
                // without this nil value separating the objects in the query string, the server would mistakenly parse:
                //   object_list: [
                //     {
                //       key1: 1,
                //       key2: 2
                //     }
                //   ]
              }
            })
          }
        }
      }
    }

    // initialze the array that will contain the param values
    let query_string_params = []

    // push param values into the query_string_params array by iterating through the top level keys
    for (let key in data) {
      recursively_push_query_string_params(key, data[key])
    }

    // join the params with &s and return the resulting query string
    return query_string_params.join("&")
  }

  _ajax(url, data, headers, method, skip_error_handler) {
    let body = {}
    let post_headers = {}
    const query_string = this._generate_query_string(data, url, method) // url & method are ONLY passed for a more helpful console error if data is invalid

    if (method != "GET") {
      body = { body: query_string }
      post_headers = { "Content-Type": "application/x-www-form-urlencoded" }
    } else {
      url = `${url}?${query_string}`
    }

    let action = {
      method: method,
      headers: { ...headers, ...Fetcher._get_csrf_token(), ...post_headers },
      ...body,
      credentials: "include"
    }

    let self = this
    if (this.error_handler == null) {
      return fetch(url, action)
    } else {
      return fetch(url, action).then(function(result) {
        if (!result.ok && !skip_error_handler) {
          self.error_handler()
        }
        return result
      })
    }
  }

  // Returns a hash with a key and value matching the rails CSRF token for the page
  static _get_csrf_token() {
    let param_name = "X-CSRF-Token"
    let token = document.querySelector("meta[name=csrf-token]").content

    return { [param_name]: token }
  }

  get(url, data = {}, headers = {}, skip_error_handler = false) {
    return this._ajax(url, data, headers, "GET", skip_error_handler)
  }

  put(url, data = {}, headers = {}, skip_error_handler = false) {
    return this._ajax(url, data, headers, "PUT", skip_error_handler)
  }

  post(url, data = {}, headers = {}, skip_error_handler = false) {
    return this._ajax(url, data, headers, "POST", skip_error_handler)
  }

  delete(url, data = {}, headers = {}, skip_error_handler = false) {
    return this._ajax(url, data, headers, "DELETE", skip_error_handler)
  }
}

export default Fetcher
