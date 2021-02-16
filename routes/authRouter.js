const router = require('express').Router()
const { UserController } = require('../controllers')

router.post('/login', UserController.login)
router.post('/register/customer', UserController.registerCustomer)
router.post('/login/customer', UserController.loginCustomer)

module.exports = router