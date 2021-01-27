const router = require("express").Router()
const userRouter = require("./userRouter")
const productRouter = require("./productRouter")
const orderRouter = require("./orderRouter")
const { authentication } = require("../middlewares/auth")

router.use(userRouter)
router.use(productRouter)
router.use(authentication)
router.use(orderRouter)

module.exports = router