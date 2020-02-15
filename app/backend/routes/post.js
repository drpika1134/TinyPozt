const router = require('express').Router()
const { checkAuth } = require('../middleware/checkAuth')

router.use(checkAuth)
router.get('/', (req, res) => {
  res.json({ success: true })
})
/*
  @route  GET /post/:id
  @desc   Retrieve information about a post
  @access Logged in Only
*/
router.get('/post/:id', (req, res) => {})

/*
  @route  POST /post
  @desc   Insert a new post
  @access Logged in Only
*/
router.post('/post', (req, res) => {})

module.exports = router
