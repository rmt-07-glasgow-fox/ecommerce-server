const router = require('express').Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const { authentication } = require('../middlewares/auth')

router.get('/', (req, res) => {
  res.send('Welcome to my ecommerce web app')
})

router.use(userRoute)
router.use('/products', authentication, productRoute)

module.exports = router