const router = require('express').Router()
const { CartController } = require('../controllers')

router.get('/', ProductController.get)
router.get('/:id', ProductController.getById)
router.post('/', ProductController.create)
router.put('/:id', ProductController.updateAll)
router.delete('/:id', ProductController.delete)

module.exports = router