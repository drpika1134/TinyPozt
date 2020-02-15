const jwt = require('jsonwebtoken')
const { refreshAccessToken } = require('../utils/tokens')

/**
 * Check if a user is authenticated (have a valid JWT)
 *
 * @param {*} req - req obj provided by express
 * @param {*} res - res obj provided by express
 * @param {*} next - next func provided by express
 * @returns - Returns a response to the user
 */
function checkAuth(req, res, next) {
  console.log('checkAuth!')
  const token = req.headers['x-token']
  const refreshToken = req.headers['x-rtoken']
  if (token) {
    try {
      const { user } = jwt.verify(token, process.env.SECRET)
      req.user = user
    } catch (err) {
      const [newAccessToken, user] = refreshAccessToken(
        refreshToken,
        process.env.SECRET2
      )

      // Check if refresh token is invalid
      if (newAccessToken === null) {
        return res.json({ authorized: false })
      }

      req.user = user
      res.cookie('token', newAccessToken)
    }
  } else {
    return res.status(401).send()
  }
  next()
}
module.exports = {
  checkAuth
}
