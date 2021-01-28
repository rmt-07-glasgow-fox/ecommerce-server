const router = require('express').Router()
const productRouter = require('./product')
const cartRouter = require('./cart')
const Controller = require('../controllers/userController')

router.get('/', (req, res) => {
    res.send('welcome')
})
router.post('/login', Controller.login)
router.post('/register', Controller.register)
router.use('/products', productRouter)
router.use('/carts', cartRouter)

module.exports = router