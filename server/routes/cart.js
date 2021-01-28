const router = require('express').Router()
const Controller = require('../controllers/Cart')

router.get('/', Controller.getCart)
router.post('/', Controller.postCart)
router.patch('/list/:id', Controller.patchCart)
router.patch('/payment', Controller.patchPayment)
router.delete('/:id', Controller.deleteCart)

module.exports = router
