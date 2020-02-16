const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const saltRounds = 10

const router = require('express').Router()

const User = require('../models/User')
const { createTokens } = require('../utils/tokens')

/*
  @route  POST /login
  @desc   Log in a user
  @access Public
*/
router.post('/login', (req, res) => {
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

/*
  @route  POST /register
  @desc   Register a user
  @access Public
*/
router.post('/register', (req, res) => {
  const { username, password } = req.body

  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) return res.status(500)

    const newUser = new User({
      username,
      password: hash
    })

    newUser
      .save()
      .then(() => {
        res.json({ success: true })
      })
      .catch(err => console.log(err))
  })
})

module.exports = router
