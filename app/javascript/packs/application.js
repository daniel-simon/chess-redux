/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import thunk from 'redux-thunk'

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import RootReducer from '../reducers/RootReducer'

import InitialState from '../InitialState'

import Routes from '../routes/Routes'

import * as types from '../actions/ActionTypes'


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  RootReducer,
  InitialState,
  applyMiddleware(thunk, routerMiddleware(history))
)

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo')

// Set initial user
// store.dispatch({type: types.SET_USER, value: window.initial.user});

document.addEventListener('turbolinks:load', () => {
  if (document.getElementById('react-entry-point')) {
    ReactDOM.render(
      <Provider store={store}>
        { /* ConnectedRouter will use the store from Provider automatically */ }
        <ConnectedRouter history={history}>
          {Routes}
        </ConnectedRouter>
      </Provider>,
      document.getElementById('react-entry-point')
    )
  }
})

