const router = require('express').Router();
const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
const productRouter = require('./productRouter');
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

module.exports = router;
