const router = require('express').Router()
const Controller = require('../controllers/content')
const multer = require('../middlewares/multer')
const { authenticate, authorizeAdmin } = require("../middlewares/auth")

router.get("/", Controller.getContent)
router.get('/list/:id', Controller.getOneContent)
router.use(authenticate)
router.post('/', authorizeAdmin, Controller.postContent)
router.post('/image', authorizeAdmin, multer.single('file'), Controller.postContentImage)
router.put("/:id", authorizeAdmin, Controller.putContent)
router.delete("/:id", authorizeAdmin, Controller.deleteContent)

module.exports = router
