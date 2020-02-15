import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

import setAuthTokens from './setAuthToken'
import store from '../redux/store'
import { setAuthenticated } from '../redux/actions/authAction'

export default function checkTokenExist() {
  const token = Cookies.get('token')
  const rToken = Cookies.get('rToken')

  // Check if rToken?
  if (token) {
    const decoded = jwt_decode(token)
    const decodedR = jwt_decode(rToken)
    const getCurrentTimeInSecond = Date.now() / 1000
    // Check if jwt token is valid so no re-authentication is needed
    if (
      decoded.exp < getCurrentTimeInSecond &&
      decodedR.exp < getCurrentTimeInSecond
    ) {
      store.dispatch(setAuthenticated(false))
      setAuthTokens(false)

      Cookies.remove('token')
      Cookies.remove('rToken')

      window.location.href = '/'
    } else {
      store.dispatch(setAuthenticated(true))
      setAuthTokens(token, rToken)
    }
  }
}
