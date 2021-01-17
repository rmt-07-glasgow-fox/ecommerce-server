const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const errorHandler = require('../middlewares/errorHandler');
const productRouter = require('./productRouter');

router.use(authRouter);
router.use('/products', productRouter);

router.use(errorHandler);

module.exports = router;