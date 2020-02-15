import React, { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import LoginForm from './components/Login/LoginForm'
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
          <LoginForm />
        </Route>
        <PrivateRoute path="/test">
          <Test />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App
