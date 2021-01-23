const router = require('express').Router();
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const bannerRouter = require('./bannerRouter');
const categoryRouter = require('./categoryRouter');
const { authenticate } = require('../middlewares/auth')

router.use('/', userRouter);
router.use(authenticate);
router.use('/banners', bannerRouter)
router.use('/products', productRouter);
router.use('/categories', categoryRouter)

module.exports = router