const AuthController = require('../controllers/authController')
const router = require('express').Router()

router.post('/login', AuthController.login)
// router.post('/register', AuthController.register)

module.exports = router