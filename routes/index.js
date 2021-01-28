const router = require('express').Router();

const userRoutes = require('./user.js');
const productRoutes = require('./product.js');
const cartRoutes = require('./cart.js');
const wishlistRoutes = require('./wishlist.js');

router.use(userRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/wishlist', wishlistRoutes);



module.exports = router;