import axios from 'axios'

export default function setAuthTokens(token, rToken) {
  if (token === false) return
  axios.defaults.headers.common['x-token'] = token
  axios.defaults.headers.common['x-rtoken'] = rToken
}
