const router = require('express').Router();
const { route } = require('./product.js');
const productsRouters = require('./product.js')

router.get('/', (req, res) => {
    res.status(200).json({msg: "Hai Domo"});
});

router.use('/products', productsRouters)

module.exports = router