const router = require('express').Router()
const cartProductController = require('../controllers/cartProductController')

router.get('/cartProduct', cartProductController.get)
router.post('/cartProduct', cartProductController.add)

module.exports = router