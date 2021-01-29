const router = require('express').Router()
const cartProductController = require('../controllers/cartProductController')
const { customerAuthenticate } = require('../middlewares/auth')

// router.use(customerAuthenticate)
router.get('/cartProduct', customerAuthenticate, cartProductController.get)
router.post('/cartProduct', customerAuthenticate, cartProductController.add)
router.put('/cartProduct/:id', customerAuthenticate, cartProductController.update)
router.delete('/cartProduct/:id', customerAuthenticate, cartProductController.delete)

module.exports = router