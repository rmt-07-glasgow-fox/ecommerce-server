const routes = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const categoryRoutes = require('./category')
const bannerRoutes = require('./banner')
const authentication = require('../middlewares/authentication')

routes.use(userRoutes)
//authentication
routes.use(authentication)
routes.use(productRoutes)
routes.use(categoryRoutes)
routes.use(bannerRoutes)

module.exports = routes