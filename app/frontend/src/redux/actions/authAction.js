import axios from 'axios'
import Cookies from 'js-cookie'

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  SET_AUTH
} from './types'
import setAuthTokens from '../../utils/setAuthToken'

export function login(data) {
  return function(dispatch) {
    axios
      .post('/auth/login', data)
      .then(res => {
        setAuthTokens(Cookies.get('token'), Cookies.get('rToken'))
        dispatch({ type: LOGIN_SUCCESS })
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: LOGIN_ERROR })
      })
  }
}

export function register(data) {
  return function(dispatch) {
    axios
      .post('/auth/register', data)
      .then(res => {
        dispatch({ type: REGISTER_SUCCESS })
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: REGISTER_ERROR })
      })
  }
}

export function setAuthenticated(loggedIn) {
  return {
    type: SET_AUTH,
    payload: {
      auth: loggedIn
    }
  }
}
