const router = require('express').Router();
const Controller = require('../controllers/controller.js');
const banner = require('./banner.js');
const category = require('./category.js');
const product = require('./product.js');
const user = require('./user.js');

router.get('/', Controller.home);

router.use('/', user);
router.use('/banner', banner);
router.use('/product', product);
router.use('/category', category);

module.exports = router;