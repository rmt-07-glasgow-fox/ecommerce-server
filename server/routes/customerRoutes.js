const { BannerController, CategoryController } = require('../controllers')
// const { auntheticate, authorized } = require('../middlewares')
const express = require('express')
const router = express.Router()

router.get('/banners', BannerController.getBanners)
router.get('/categories', CategoryController.getCategories)
router.get('/categories/:id', CategoryController.getCategoriesId)

module.exports = router