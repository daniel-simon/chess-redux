import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {push} from 'react-router-redux'


const Home = props => {
  return (
    <div>
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
