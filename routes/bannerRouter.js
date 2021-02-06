const router = require('express').Router();
const BannerController = require('../controllers/bannerController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/', BannerController.getBanners);
router.use(authenticate);
router.post('/', authorize, BannerController.postBanner);
router.delete('/:id', authorize, BannerController.deleteBanner);

module.exports = router;