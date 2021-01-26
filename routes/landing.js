const routes = require('express').Router()
const { ProductController, CategoryController, BannerController } = require('../controllers')
const checkProductId = require('../middlewares/check-productid')
const checkCategoryId = require('../middlewares/check-categoryid')
const checkBannerId = require('../middlewares/check-bannerid')

// show products to customer without authentication
routes.get('/products', ProductController.getProduct)
routes.get('/products/:id', checkProductId, ProductController.getProductById)
// show categories to customer without authentication
routes.get('/categories', CategoryController.getCategory)
routes.get('/categories/:id', checkCategoryId,CategoryController.getCategoryById)
// show banners to customer without authentication
routes.get('/banners', BannerController.getBanner)
routes.get('/banners/:id', checkBannerId, BannerController.getBannerById)

module.exports = routes