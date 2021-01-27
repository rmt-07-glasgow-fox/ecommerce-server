const router = require('express').Router()
const { UserController } = require('../controllers/userController')
const { customerAuthorization } = require('../middlewares/auth')

router.post('/login', UserController.login)
router.post('/register', customerAuthorization, UserController.register)

module.exports = router