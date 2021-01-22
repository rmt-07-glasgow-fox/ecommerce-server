const router = require('express').Router()
const BannerController = require('../controllers/BannerController')
const { authorization } = require('../middlewares/auth')

router.get('/', BannerController.getBanners)
router.post('/', BannerController.createBanner)
router.get('/:id', BannerController.getBannerById)
router.put('/:id', authorization, BannerController.updateBanner)
router.delete('/:id', authorization, BannerController.destroyBanner)


module.exports = router