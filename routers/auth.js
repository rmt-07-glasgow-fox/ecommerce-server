const router = require('express').Router()
const Controller = require('../controllers/authController')

router.post('/login', Controller.login)
router.post('/loginCustomer', Controller.loginCustomer)
router.post('/register', Controller.register)

module.exports = router