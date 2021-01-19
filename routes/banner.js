const BannerController = require('../controllers/banner')
const { authorize, authorizeBanner } = require('../middlewares/auth')

const router = require('express').Router()

router.route('/')
  .get(BannerController.showAll)
  .post(authorize, BannerController.create)

router.route('/:id')
  .put(authorizeBanner, BannerController.edit)
  .delete(authorizeBanner, BannerController.delete)

module.exports = router