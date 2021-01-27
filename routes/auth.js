const AuthController = require('../controllers/authController')
const Auth = require('../middlewares/auth')
const router = require('express').Router()

router.post('/login-admin', Auth.authLoginAdmin, AuthController.login)
router.post('/login', Auth.authLoginCust, AuthController.login)
router.post('/register', AuthController.register)

module.exports = router