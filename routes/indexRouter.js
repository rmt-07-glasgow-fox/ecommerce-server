const router = require ('express').Router()
const productRouter = require ('../routes/productsRouter')
const userRouter = require ('../routes/usersRouter')
const { authenticate } = require ('../middlewares/auth')

router.use ('/', userRouter)

// router.use (authenticate)

router.use ('/', productRouter)

module.exports = router