const jwt = require('jsonwebtoken')

/**
 * Create new access and refresh tokens after successfully logged in
 *
 * @param {object} user - Main information about the current user
 * @param {string} secret - JWT Secret for access tokens
 * @param {string} secret2 - JWT Secret for refresh tokens
 * @returns - Returns an array consists of the access and refresh tokens
 */
function createTokens(user, secret, secret2) {
  const accessToken = jwt.sign({ user }, secret, { expiresIn: '30s' })
  const refreshToken = jwt.sign({ user }, secret2, { expiresIn: '5m' })

  return [accessToken, refreshToken]
}

/**
 * Refresh access token
 *
 * @param {string} refreshToken - Refresh Token
 * @param {string} secret2 - JWT secret for refresh tokens
 * @returns {[]} - Returns an array containing the newly refreshed token and current user
 */
function refreshAccessToken(refreshToken, secret2) {
  let newAccessToken
  try {
    const { user } = jwt.verify(refreshToken, process.env.SECRET2)
    newAccessToken = jwt.sign({ user }, process.env.SECRET, {
      expiresIn: '1m'
    })
    return [newAccessToken, user]
  } catch (err) {
    newAccessToken = null
    user = null
    return [newAccessToken, user]
  }
}

module.exports = {
  createTokens,
  refreshAccessToken
}
