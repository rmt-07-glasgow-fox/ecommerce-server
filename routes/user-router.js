const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user-controller')

router.post('/login', UserController.login)

module.exports = router