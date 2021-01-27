const { UserController } =require('../controllers')
const express = require('express')
const router = express.Router()

// admin login
router.post('/login', UserController.handleLogin)
// customer login
router.post('/customer/login', UserController.customerLogin)
router.post('/customer/register', UserController.customerRegister)

module.exports = router