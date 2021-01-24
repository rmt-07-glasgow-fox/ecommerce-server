const router = require('express').Router()
const content = require('./content')
const banner = require('./banner')
const user = require('./user')
const { authenticate, authorize } = require("../middlewares/auth")

router.use(user)

router.use(authenticate)

router.use('/contents', authorize, content)

router.use('/banners', authorize, banner)

module.exports = router