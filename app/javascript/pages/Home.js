import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {push} from 'react-router-redux'


const Home = props => {
  return (
    <div className="container">
      <div className="columns">
        <div className="column col-xs-12">
          <h1>Hello World</h1>
        </div>
      </div>
      <div className="columns">
        <div className="column col-xs-6">col-xs-6</div>
        <div className="column col-xs-3">col-xs-3</div>
        <div className="column col-xs-3">
          <button className="btn btn-primary">Spectre is working!</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
