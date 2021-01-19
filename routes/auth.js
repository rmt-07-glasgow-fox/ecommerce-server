const AuthController = require('../controllers/authController')
const Auth = require('../middlewares/auth')
const router = require('express').Router()

router.post('/login', Auth.authAdmin, AuthController.login)
// router.post('/register', AuthController.register)

module.exports = router