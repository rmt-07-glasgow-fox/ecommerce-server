const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const products = require('./product')
const categories = require('./category')
const banner = require('./banner')
const { authenticate } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.send('Welcome to CMS-Used-Aircraft')
  })
router.use(authRouter)
router.use(authenticate)
router.use('/categories',categories )
router.use('/products',products )
router.use('/banner',banner )


module.exports = router