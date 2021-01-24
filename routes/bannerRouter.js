const router = require('express').Router();
const BannerController = require('../controllers/bannerController');
const { authorize } = require('../middlewares/auth');

router.get('/', BannerController.getBanners);
router.post('/', authorize, BannerController.postBanner);
router.delete('/:id', authorize, BannerController.deleteBanner);

module.exports = router;