const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const { authenticate } = require('../middlewares/auth')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.use(authenticate)
router.get('/user', userController.getInfo)



module.exports = router