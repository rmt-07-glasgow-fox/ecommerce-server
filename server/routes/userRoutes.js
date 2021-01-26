const { UserController } =require('../controllers')
const express = require('express')
const router = express.Router()

router.post('/login', UserController.handleLogin)
router.post('/register', UserController.handleRegister)

module.exports = router