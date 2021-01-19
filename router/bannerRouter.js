const router = require('express').Router()

// import
const BannerController = require('../controllers/bannerController')
const { authorizeAdminOnly } = require('../middleware/auth')

router.get('/', BannerController.showBanner)
router.post('/', authorizeAdminOnly, BannerController.addBanner)

module.exports = router