const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/login', UserController.userLogin)

module.exports = router