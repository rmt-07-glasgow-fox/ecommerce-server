const router = require('express').Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const bannerRouter = require('./bannerRoute')
const { authentication } = require('../middlewares/auth')

router.get('/', (req, res) => {
  res.send('Welcome to mah ecommerce web app')
})

router.use(userRoute)
router.use('/products', authentication, productRoute)
router.use('/banners', authentication, bannerRouter)

module.exports = router