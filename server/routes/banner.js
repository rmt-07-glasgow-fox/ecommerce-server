const router = require('express').Router()
const Controller = require('../controllers/banner')
const multer = require('../middlewares/multer')
const { authenticate, authorizeAdmin } = require("../middlewares/auth")

router.get("/", Controller.getBanner)
router.get('/:id', Controller.getOneBanner)
router.use(authenticate)
router.post('/', authorizeAdmin, Controller.postBanner)
router.post('/image', authorizeAdmin, multer.single('file'), Controller.postBannerImage)
router.put("/:id", authorizeAdmin, Controller.putBanner)
router.delete("/:id", authorizeAdmin, Controller.deleteBanner)

module.exports = router
