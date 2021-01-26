const router = require('express').Router()
const BannerController = require('../controller/bannerController')
const {auth, author} = require('../middleware/auth')

router.post('/', BannerController.create)
router.get('/', BannerController.showBanner)

router.get('/:id', author, BannerController.selectById)
router.put('/:id', author, BannerController.update)
router.delete('/:id', author, BannerController.delete)

module.exports = router