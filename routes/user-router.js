const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user-controller')
const {authorize, authorizeCustomer} = require('../middleware/auth')

router.post('/login', UserController.login)
router.post('/customer/register', UserController.register)
router.post('/customer/login', UserController.loginCustomer)

module.exports = router