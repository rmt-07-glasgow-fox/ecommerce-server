const router = require('express').Router()
const productRouter = require("./productRouter")
const userRouter = require("./userRouter")
const cartRouter = require('../routes/cartRouter')
const isLogin = require('../middlewares/authentication')
const productController = require("../controllers/productController.js")


router.use('/users', userRouter)
router.get('/products', productController.get)

router.use(isLogin)
router.use('/products', productRouter)
router.use('/cart', cartRouter)


module.exports = router