const router = require('express').Router()
const BannerController = require('../controllers/banner')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', BannerController.getAllBanner)
router.post('/', BannerController.createBanner)
router.put('/:id', authorization, BannerController.editBanner)
router.delete('/:id', authorization, BannerController.deleteBanner)

module.exports = router