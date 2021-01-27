const routes = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const categoryRoutes = require('./category')
const bannerRoutes = require('./banner')
const customerLanding = require('./landing')
const cartRoutes = require('./cart')
const wishlistRoutes = require('./wishlist')
const transactionRoutes = require('./transaction')
const authentication = require('../middlewares/authentication')


// Customer can see this without login
routes.use(customerLanding)
routes.use(userRoutes)

// After this only logged in user can access 
routes.use(authentication) // authentication

// Customer routes
routes.use(transactionRoutes)
routes.use(cartRoutes)
routes.use(wishlistRoutes)

// Admin routes
routes.use(productRoutes)
routes.use(categoryRoutes)
routes.use(bannerRoutes)

module.exports = routes