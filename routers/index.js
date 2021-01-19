const express = require('express')
const router = express.Router()

const { authentication, authorization } = require('../middlewares/auth')
const usersController = require('../controllers/usersController')
const productsController = require('../controllers/productsController')

router.post('/login', usersController.login)
router.post('/register', usersController.register)

router.use(authentication)
router.post('/products', productsController.create)

module.exports = router