const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')
const { authorize } = require('../middlewares/auth')

router.post('/', authorize, categoryController.insert)
router.get('/', authorize, categoryController.findAll)
router.put('/:id',authorize, categoryController.update)
router.patch('/:id',authorize, categoryController.patch)
router.delete('/:id',authorize, categoryController.delete)


module.exports = router