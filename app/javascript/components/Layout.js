import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'


const Layout = ({
  goTo,
  children
}) => {
  return(
    <div>
      <main>
        {children}
      </main>
    </div>
  )
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goTo: (e, path) => {
      e.preventDefault()
      dispatch(push(path))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
