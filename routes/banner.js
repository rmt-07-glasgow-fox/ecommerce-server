const BannerController = require('../controllers/bannerController')
const Auth = require('../middlewares/auth')
const router = require('express').Router()

router.get('/', BannerController.findAll)
router.get('/:id', BannerController.findByPk)
router.use(Auth.authorizationAdmin)
router.post('/', BannerController.create)
router.put('/:id', BannerController.update)
router.delete('/:id', BannerController.delete)

module.exports = router