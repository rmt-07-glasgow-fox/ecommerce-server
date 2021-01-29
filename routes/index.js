const router = require('express').Router();
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const bannerRouter = require('./bannerRouter');
const categoryRouter = require('./categoryRouter');

router.use('/users', userRouter);
router.use('/categories', categoryRouter)
router.use('/banners', bannerRouter)
router.use('/products', productRouter);

module.exports = router 