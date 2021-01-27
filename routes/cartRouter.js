const router = require('express').Router()
const { CartController } = require('../controllers')
const { authorization } = require('../middlewares/auth')

router.get('/', CartController.getAllCart)
router.post('/', CartController.addCart)
router.use('/:id', authorization)
router.patch('/:id', CartController.update)
router.delete('/:id', CartController.delete)

module.exports = router