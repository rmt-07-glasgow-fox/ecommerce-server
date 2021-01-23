const router = require('express').Router()
const BannerController = require('../controllers/bannerController')

router.get('/', BannerController.getBanner)
router.post('/', BannerController.createBanner)

router.get('/:id', BannerController.getOneBanner)
router.put('/:id', BannerController.updateBanner)
router.patch('/:id', BannerController.modifyStatus)
router.delete('/:id', BannerController.deleteBAnner)

module.exports = router