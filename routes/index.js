const router = require('express').Router();
const authRouter = require('./auth');
const productRouter = require('./product');
const categoryRouter = require('./category');
const bannerRouter = require('./banner');
const cartRouter = require('./cart');
const wishlistRouter = require('./wishlist');
const isLoginCustomer = require('../middlewares/isLoginCustomers');

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello CMS'
  })
})

router.use(authRouter);
// ADMIN ROUTER
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/banners', bannerRouter);

// CUSTOMER ROUTER
router.use(isLoginCustomer);
router.use(cartRouter)
router.use(wishlistRouter)


module.exports = router