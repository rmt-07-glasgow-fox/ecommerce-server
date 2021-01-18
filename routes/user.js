const express = require('express')
const router = express.Router()
const {UserController} = require('../controllers/UserController')

router.post('/register', UserController.addNew)
router.post('/login', UserController.login)

module.exports = router
