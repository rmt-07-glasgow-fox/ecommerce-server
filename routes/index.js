const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const categoryRoutes = require('./category');
const bannerRoutes = require('./banner');
const productRoutes = require('./product');
const cartRoutes = require('./cart');

router.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

router.use('/users', userRoutes);

router.use('/categories', categoryRoutes);
router.use('/banners', bannerRoutes);
router.use('/products', productRoutes);
router.use('/carts', cartRoutes);

module.exports = router;
