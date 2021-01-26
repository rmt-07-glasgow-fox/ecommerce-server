const { CartController } = require('../controllers')
const express = require('express')
const { route } = require('./userRoutes')
const router = express.Router()

router.get('/', CartController.getCarts)
router.post('/', CartController.addCarts)
router.patch('/:id', CartController.updateCarts)
router.delete('/:id', CartController.removeCarts)

module.exports = router