const express = require('express')
const router = express.Router()

const { authentication, authorization } = require('../middlewares/auth')
const usersController = require('../controllers/usersControllers')

router.post('/login', usersController.login)

module.exports = router