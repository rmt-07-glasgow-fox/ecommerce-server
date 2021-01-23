const { BannerController } = require('../controllers')
const { authorized } = require('../middlewares')
const express = require('express')
const router = express.Router()

router.get('/', BannerController.getBanners)
router.post('/', authorized, BannerController.addBanners)
router.patch('/:id', authorized, BannerController.editStatusBanners)
router.delete('/:id', authorized, BannerController.deleteBanners)

module.exports = router