const router = require('express').Router()
const cartProductController = require('../controllers/cartProductController')

router.get('/cartProduct', cartProductController.get)
router.post('/cartProduct', cartProductController.add)
router.put('/cartProduct/:id', cartProductController.update)
router.delete('/cartProduct/:id', cartProductController.delete)

module.exports = router