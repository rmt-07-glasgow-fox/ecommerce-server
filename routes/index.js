const expres = require('express')
const router = expres.Router()

const productsRoutes = require('./products_routes')

router.use('/products', productsRoutes)

module.exports = router