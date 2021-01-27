const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user-controller')
const {authorize, authorizeCustomer} = require('../middleware/auth')

router.post('/customer/register', UserController.register)
router.post('/login', authorize, UserController.login)
router.post('/customer/login', UserController.login)

module.exports = router