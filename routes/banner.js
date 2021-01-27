const router = require('express').Router()
const BannerController = require('../controllers/bannerController')
const { authenticate, authorize } = require('../middlewares/auth')

router.get('/', BannerController.getBanner)

router.use(authenticate)
router.use(authorize)
router.post('/', BannerController.createBanner)
router.get('/:id', BannerController.getOneBanner)
router.put('/:id', BannerController.updateBanner)
router.patch('/:id', BannerController.modifyStatus)
router.delete('/:id', BannerController.deleteBAnner)

module.exports = router