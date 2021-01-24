const router = require('express').Router()
const Controller = require('../controllers/banner')
const multer = require('../middlewares/multer')

router.get("/", Controller.getBanner)
router.get('/:id', Controller.getOneBanner)
router.post('/', Controller.postBanner)
router.post('/image', multer.single('file'), Controller.postBannerImage)
router.put("/:id", Controller.putBanner)
router.delete("/:id", Controller.deleteBanner)

module.exports = router
