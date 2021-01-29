const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const productionRouter = require('./productionRouter');
const userRouter = require('./userRouter');
const customerRouter = require('../routes/customerRouter');

router.get('/', (req, res) => {
    res.send(`hello world`)
})

router.use('/customers', customerRouter);

router.use('/users', userRouter);

router.use('/products', authentication);

router.use('/products', productionRouter);

module.exports = router;