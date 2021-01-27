const router = require('express').Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const bannerRouter = require('./bannerRoute')
const cartRouter = require('./cartRoute')
const cartItemRouter = require('./cartItemRoute')
const { authentication, customerAuthorization } = require('../middlewares/auth')

router.get('/', (req, res) => {
  res.send('Welcome to mah ecommerce web app')
})

router.use(userRoute)
router.use('/products', productRoute)
router.use(authentication, customerAuthorization, cartRouter)
router.use(authentication, customerAuthorization, cartItemRouter)
router.use('/banners', authentication, bannerRouter)

module.exports = router