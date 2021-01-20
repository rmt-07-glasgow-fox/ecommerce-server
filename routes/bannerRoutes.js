const router = require('express').Router()
const BannerController = require('../controllers/BannerController')
const authorization = require('../middlewares/auth').bannerAuthorization

router.post('/', BannerController.addBanner)
router.get('/', BannerController.getAllBanners)
router.get('/:id', authorization, BannerController.getBannerById)
router.put('/:id', authorization, BannerController.editBannerById)
router.delete('/:id', authorization, BannerController.deleteBannerById)

module.exports = router