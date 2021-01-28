const router = require('express').Router()
const productsRoutes = require('./productsRoutes')
const userRoutes = require('./userRoutes')
const cartRoutes = require('./cartRoutes')

router.get('/', (req, res) => {
  res.send('Welcome')
})

router.use(userRoutes)
router.use('/products', productsRoutes)
router.use(cartRoutes)

module.exports = router