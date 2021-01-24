const router = require('express').Router();
const authRouter = require('./auth');
const productRouter = require('./product');
const categoryRouter = require('./category');
const bannerRouter = require('./banner');

const isLogin = require('../middlewares/isLogin');

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello CMS'
  })
})

router.use(authRouter);
router.use(isLogin)
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/banners', bannerRouter);


module.exports = router