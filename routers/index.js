const express = require('express')
const router = express.Router()

const { authentication, authorization } = require('../middlewares/auth')
const usersController = require('../controllers/usersController')
const productsController = require('../controllers/productsController')
const cartsController = require('../controllers/cartsController')

router.get('/', (req, res) => {
  res.send('<h1>Welcome to Danuspedia server!</h1>')
})

router.post('/login', usersController.login)
router.post('/register', usersController.register)

// Products
router.get('/products', productsController.showAll)
router.use(authentication)
router.post('/products', productsController.create)
router.put('/products/:id', productsController.update)
router.delete('/products/:id', authorization, productsController.delete)

// Cart
router.post('/cart', cartsController.addToCart)
router.put('/cart', cartsController.update)
router.get('/cart', cartsController.showAll)
router.post('/cart/checkout', cartsController.checkout)
router.delete('/cart/:id', cartsController.delete)
router.get('/cart/history', cartsController.history)

module.exports = router