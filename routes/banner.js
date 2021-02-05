const express = require('express')
const router = express.Router()
const bannerController = require('../controllers/banner')
const { authorize } = require('../middlewares/auth')

router.post('/', authorize, bannerController.insert)
router.get('/', bannerController.findAll)
router.put('/:id',authorize, bannerController.update)
router.patch('/:id',authorize, bannerController.patch)
router.delete('/:id',authorize, bannerController.delete)


module.exports = router