const router = require('express').Router();

const userRoutes = require('./user.js');
const productRoutes = require('./product.js');

router.use(userRoutes);
router.use('/products', productRoutes);


module.exports = router;