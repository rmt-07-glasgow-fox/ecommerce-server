const routes = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const categoryRoutes = require('./category')
const authentication = require('../middlewares/authentication')

routes.use(userRoutes)
//authentication
routes.use(authentication)
routes.use(productRoutes)
routes.use(categoryRoutes)

module.exports = routes