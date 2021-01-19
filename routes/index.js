const router = require('express').Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')

router.use('/', () => {
  res.send('Welcome to my ecommerce web app')
})

router.use('/products', productRoute)
router.use(userRoute)

module.exports = router