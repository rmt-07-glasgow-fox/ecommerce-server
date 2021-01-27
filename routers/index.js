const router = require('express').Router();
const Controller = require('../controllers/controller.js');
const banner = require('./banner.js');
const category = require('./category.js');
const product = require('./product.js');
const cart = require('./cart.js');
const user = require('./user.js');
const { authenticate } = require('../middlewares/auth.js');


router.get('/', Controller.home);

router.use('/', user);
router.use('/banner', banner);
router.use('/product', product);
router.use('/category', category);

router.use(authenticate);

router.use('/cart', cart);

module.exports = router;