const router = require("express").Router()
const user = require("./user")
const product = require("./product")
const {authenticate} = require("../middlewares/auth")

router.use("/", user)
router.use("/", authenticate, product)

module.exports = router