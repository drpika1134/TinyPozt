const bcrypt = require('bcrypt')
const saltRounds = 10

const router = require('express').Router()

const { createTokens } = require('../utils/tokens')

/*
  @route  POST /login
  @desc   Log in a user
  @access Public
*/
router.post('/login', (req, res) => {
  // If login successfully, send them back an access and refresh token
  const { username, password } = req.body

  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) return res.status(500)

    // Ideally, we want to add the hash of their password to
    // the secret for refresh token because if they decided
    // to change the password, a new refresh token will be
    // given to them and the old one will be invalidated
    const [accessToken, refreshToken] = createTokens(
      username,
      process.env.SECRET,
      process.env.SECRET2
    )

    res
      .cookie('token', accessToken)
      .cookie('rToken', refreshToken)
      .json({ success: true })
  })
})

module.exports = router
