const router = require('express').Router();
const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
const productRouter = require('./productRouter');
const bannerRouter = require('./bannerRouter');
const cartRouter = require('./cartRouter');

router.use('/', userRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/banners', bannerRouter);
router.use('/carts', cartRouter);

module.exports = router;
