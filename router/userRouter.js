const router = require('express').Router()
const UserController = require('../controllers/userController')

// admin 
router.post('/login', UserController.login)

// client
router.post('/register', UserController.register)
router.post('/loginUser', UserController.loginUser)

module.exports = router