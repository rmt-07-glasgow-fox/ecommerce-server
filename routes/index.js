const router = require('express').Router()
const user = require("./user")
const product = require("./product")
const banner = require("./banner")
const {authentication} = require("../middlewares/auth")

router.use(user)
router.use(authentication)
router.use(product)
router.use(banner)

module.exports = router