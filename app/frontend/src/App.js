import React, { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import LoginForm from './components/Login/LoginForm'
import RegisterForm from './components/Register/RegisterForm'

import PrivateRoute from './components/PrivateRoute'

import checkTokenExist from './utils/checkTokenExist'

checkTokenExist()

function Test() {
  useEffect(() => {
    console.log('fetching data!')
    async function fetchData() {
      try {
        const response = await axios.get('/api')
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  return <div>LMAo</div>
}

function App() {
  return (
    <Router>
      <Link to="/test">Test</Link>
      <Switch>
        <Route exact path="/">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <PrivateRoute path="/test">
          <Test />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App
