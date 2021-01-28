const router = require('express').Router()
const BannerController = require('../controllers/BannerController')
const { bannerAuthorization, authentication } = require('../middlewares/auth')

router.get('/', BannerController.getAllBanners)
router.use(authentication)
router.post('/', BannerController.addBanner)
router.get('/:id', bannerAuthorization, BannerController.getBannerById)
router.put('/:id', bannerAuthorization, BannerController.editBannerById)
router.delete('/:id', bannerAuthorization, BannerController.deleteBannerById)

module.exports = router