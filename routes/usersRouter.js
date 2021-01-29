const router = require ('express').Router()
const UserController = require ('../controller/UserController')
const { authenticate } = require ('../middlewares/auth')

router.post ('/register', UserController.register)

router.post ('/login', UserController.login)

router.patch ('/user/balance/reduce', authenticate, UserController.reduceBalance)

router.get ('/user/balance', authenticate, UserController.getBalance)

router.patch ('/user/balance', authenticate, UserController.updateBalance)


module.exports = router