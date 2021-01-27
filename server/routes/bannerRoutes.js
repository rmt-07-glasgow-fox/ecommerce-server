const { BannerController } = require('../controllers')
const { bannerAuthorized } = require('../middlewares')
const express = require('express')
const router = express.Router()

router.get('/', BannerController.getBanners)
router.post('/', bannerAuthorized, BannerController.addBanners)
router.patch('/:id', bannerAuthorized, BannerController.editStatusBanners)
router.delete('/:id', bannerAuthorized, BannerController.deleteBanners)

module.exports = router