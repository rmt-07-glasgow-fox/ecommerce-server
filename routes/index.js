const router = require('express').Router()
const user = require("./user")
const product = require("./product")
const {authentication} = require("../middlewares/auth")

router.use(user)
router.use(authentication)
router.use(product)

module.exports = router