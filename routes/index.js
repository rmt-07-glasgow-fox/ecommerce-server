const router = require('express').Router();
const productsRouters = require('./product.js')
const ProductController = require('../controllers/productController.js');
const authRouters = require('./auth')
const cartRouters = require('./cart');
const { authentication } = require('../middlewares/index.js');

router.get('/', (req, res) => {
    res.status(200).json({msg: "Hai Domo"});
});

router.use(authRouters)
router.get('/products', ProductController.showAllList)
router.use(authentication)
router.use('/products', productsRouters)
router.use('/carts', cartRouters)

module.exports = router