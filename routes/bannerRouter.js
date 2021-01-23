const router = require('express').Router();
const BannerController = require('../controllers/BannerController');
const { authorize } = require('../middlewares/auth')

router.get('/', BannerController.fetchBanners)
router.post('/', authorize, BannerController.createBanner)
router.get('/:id', BannerController.fetchBanner)
router.put('/:id', authorize, BannerController.updateBanner)
router.delete('/:id', authorize, BannerController.deleteBanner)
router.patch('/status/:id', authorize, BannerController.updateStatus)

module.exports = router;