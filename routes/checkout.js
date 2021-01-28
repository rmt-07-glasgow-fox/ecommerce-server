const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')


router.patch('/checkout', cartController.checkout)


module.exports = router