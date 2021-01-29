const router = require('express').Router();
const BannerController = require('../controllers/bannerController.js');
const { authorize, authenticate } = require('../middlewares/auth.js');

router.get('/', BannerController.readBanner);
router.get('/:id', BannerController.readOneBanner);

router.use(authenticate);
router.post('/', authorize, BannerController.createBanner);
router.put('/:id', authorize, BannerController.updateBanner);
router.delete('/:id', authorize, BannerController.deleteBanner);

module.exports = router;