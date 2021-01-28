const UserController = require('../controllers/auth')

const router = require('express').Router()

router.post('/login', UserController.login)
router.post('/register', UserController.register)

module.exports = router