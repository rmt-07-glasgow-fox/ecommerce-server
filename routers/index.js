const router = require('express').Router();
const Controller = require('../controllers/controller.js');
const product = require('./product.js');
const user = require('./user.js');

router.use('/', user);

router.get('/', Controller.home);

router.use('/product', product);

module.exports = router;