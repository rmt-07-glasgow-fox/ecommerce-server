const { UserController, BannerController, CategoryController } = require('../controllers')
// const { auntheticate, authorized } = require('../middlewares')
const express = require('express')
const router = express.Router()

router.post('/login', UserController.customerLogin)
router.post('/register', UserController.customerRegister)
router.get('/banners', BannerController.getBanners)
router.get('/categories', CategoryController.getCategories)
router.get('/categories/:id', CategoryController.getCategoriesId)

module.exports = router