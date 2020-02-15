import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function PrivateRoute({ children, auth, ...args }) {
  return (
    <Route {...args} render={() => (auth ? children : <Redirect to="/" />)} />
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, null)(PrivateRoute)
