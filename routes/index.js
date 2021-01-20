const expres = require('express')
const router = expres.Router()

const productsRoutes = require('./products_routes')
const userRoutes = require('./user_routes')
const { authenticate } = require('../middlewares/auth')

router.use('/', userRoutes)
if (process.env.NODE_ENV !== 'test') {
    router.use(authenticate)
}
router.use('/products', productsRoutes)

module.exports = router