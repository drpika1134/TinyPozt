import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { register } from '../../redux/actions/authAction'

function RegisterForm({ register }) {
  const [input, setInput] = useState({
    username: '',
    password: ''
  })
  const onChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const onSubmit = e => {
    e.preventDefault()
    register(input)
  }

  return (
    <>
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
    </>
  )
}

export default connect(null, { register })(RegisterForm)
