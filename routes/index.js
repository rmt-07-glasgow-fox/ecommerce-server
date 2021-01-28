const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.js')
const { authenticate } = require('../middlewares/auth')

const productsRouter = require('./products')
const cartsRouter = require('./carts')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use('/products', productsRouter)
router.use('/carts', authenticate, cartsRouter)

module.exports = router

