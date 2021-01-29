const router = require('express').Router();
const BannerController = require('../controllers/BannerController');
const { authenticate, authorize } = require('../middlewares/auth')

router.get('/', BannerController.fetchBanners)
router.get('/:id', BannerController.fetchBanner)
router.use(authenticate)
router.post('/', authorize, BannerController.createBanner)
router.put('/:id', authorize, BannerController.updateBanner)
router.delete('/:id', authorize, BannerController.deleteBanner)
router.patch('/status/:id', authorize, BannerController.updateStatus)

module.exports = router;