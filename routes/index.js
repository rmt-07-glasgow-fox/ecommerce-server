const router = require('express').Router()
const adminRouter = require("./admin")
const {authenticate} = require('../middlewares/authenticate')
const UserController = require('../controllers/userController')

router.post('/login', UserController.login)
router.use(authenticate)
router.use(`/admin`, adminRouter)

module.exports = router