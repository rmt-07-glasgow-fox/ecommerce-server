const router = require('express').Router()
const { BannerController } = require('../controllers/bannerController')

router.post('/', BannerController.create)

router.get('/', BannerController.findAll)
router.get('/:id', BannerController.findOne)

router.put('/:id', BannerController.update)

router.delete('/:id', BannerController.delete)

module.exports = router