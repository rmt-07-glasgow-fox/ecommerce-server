const router = require("express").Router()
const user = require("./user")
const product = require("./product")
const cartList = require("./cartList")
const {authenticateCust} = require("../middlewares/auth")

router.use("/", user)
router.use("/products", product)
router.use("/carts", authenticateCust, cartList)

module.exports = router