import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {push} from 'react-router-redux'


const Home = props => {
  return (
    <div>
      Hello World
      <button className="btn btn-primary">Spectre is working!</button>
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
