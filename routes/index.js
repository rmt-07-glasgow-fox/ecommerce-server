const router = require('express').Router();
const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
const productRouter = require('./productRouter');
const bannerRouter = require('./bannerRouter');
const { authenticate } = require('../middlewares/auth');

router.get('/', (req, res) => {
    res.status(200),json({
        message: 'Welcome! Your server is running'
    })
});

router.use('/', userRouter);
router.use(authenticate);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/banners', bannerRouter);

module.exports = router;
