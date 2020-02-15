import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { login } from '../../redux/actions/authAction'

function LoginForm({ auth, login }) {
  const [input, setInput] = useState({
    username: '',
    password: ''
  })
  const onChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const onSubmit = e => {
    e.preventDefault()
    login(input)
  }

  return (
    <>
      {auth ? (
        <Redirect to="/test" />
      ) : (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={onChange}
          />
          <input
            type="text"
            name="password"
            value={input.password}
            onChange={onChange}
          />
          <input type="submit" />
        </form>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, { login })(LoginForm)
