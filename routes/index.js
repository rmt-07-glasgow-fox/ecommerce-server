const router = require("express").Router()
const productRoutes = require("./product")
const userRoutes = require("./user")
const cartRoutes = require('./cart')
// const { authentication } = require("../middlewares/auth")
const errorHandler = require("../middlewares/errorHandler")
// const { Controller } = require("../controllers")

router.use(userRoutes)
// router.use("/", Controller.getRootHandler)
// router.use(authentication)
router.use("/products", productRoutes)
router.use("/carts", cartRoutes)
router.use(errorHandler)

module.exports = router
