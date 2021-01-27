const { UserController } =require('../controllers')
const express = require('express')
const router = express.Router()

// admin login
router.post('/login', UserController.handleLogin)

module.exports = router