const router = require ('express').Router()
const productRouter = require ('./productsRouter')
const userRouter = require ('./usersRouter')
const cartRouter = require ('./cartRouter')
const { authenticate } = require ('../middlewares/auth')

router.use (userRouter)

router.use (productRouter)

router.use (cartRouter)


module.exports = router