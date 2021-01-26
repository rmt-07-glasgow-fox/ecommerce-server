const router = require('express').Router()
const CartController = require('../controllers/cartController')

router.post('/', CartController.addCart)

module.exports = router