const expres = require('express')
const router = expres.Router()

const productsRoutes = require('./products_routes')
const userRoutes = require('./user_routes')
const cartRoutes = require('./cart_routes')
const { authenticate } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.status(200).json({message: 'welcome to e-commerce cms app'})
})
router.use('/', userRoutes)
if (process.env.NODE_ENV !== 'test') {
    router.use(authenticate)
}
router.use('/products', productsRoutes)
router.use('/carts', cartRoutes)

module.exports = router