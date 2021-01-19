const router = require('express').Router()
const { ProductController } = require('../controllers')

router.get('/', ProductController.get)
router.post('/', ProductController.create)
router.put('/:id', ProductController.updateAll)
router.delete('/:id', ProductController.delete)

module.exports = router