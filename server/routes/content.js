const router = require('express').Router()
const Controller = require('../controllers/content')
const multer = require('../middlewares/multer')

router.get("/", Controller.getContent)
router.get('/:id', Controller.getOneContent)
router.post('/', Controller.postContent)
router.post('/image', multer.single('file'), Controller.postContentImage)
router.put("/:id", Controller.putContent)
router.delete("/:id", Controller.deleteContent)

module.exports = router
