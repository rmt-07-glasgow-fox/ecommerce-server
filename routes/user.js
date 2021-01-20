const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')

router.post('/register', UserController.register)
router.post('/login/admin', UserController.loginAdmin)
router.post('/login/customer', UserController.loginCustomer)

module.exports = router