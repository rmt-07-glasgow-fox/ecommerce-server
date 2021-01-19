const router = require('express').Router();
const productsRouters = require('./product.js')
const authRouters = require('./auth');
const { authentication } = require('../middlewares/index.js');

router.get('/', (req, res) => {
    res.status(200).json({msg: "Hai Domo"});
});

router.use(authRouters)
router.use(authentication)
router.use('/products', productsRouters)

module.exports = router