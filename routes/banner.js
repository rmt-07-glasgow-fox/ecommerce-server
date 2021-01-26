const BannerController = require('../controllers/banner')
const { authorize, authorizeBanner, authenticate } = require('../middlewares/auth')

const router = require('express').Router()

router.get('/', BannerController.showAll)
router.get('/:id', BannerController.showOne)

router.use(authenticate)
router.post(authorize, BannerController.create)
router.route('/:id')
  .put(authorizeBanner, BannerController.edit)
  .delete(authorizeBanner, BannerController.delete)

module.exports = router