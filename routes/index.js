const UserController = require('../controllers/userController')
const { errorHandler } = require('../middlewares/errorHandler')
const router = require('express').Router()

router.post('/login', UserController.login)
router.use(errorHandler)

module.exports = router