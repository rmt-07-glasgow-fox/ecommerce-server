const router = require('express').Router();
const CustomerController = require('../controllers/customerController');
const UserController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const { authorizationCustomer, authorizationId } = require('../middlewares/authorization');

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.get('/', CustomerController.readProduct);

router.use(authentication);

router.use(authorizationCustomer);

router.post('/', CustomerController.createCart);

router.patch('/:id', CustomerController.editCart);

router.get('/carts', CustomerController.readCart);

router.get('/products/:id', CustomerController.readOneProduct);

router.get('/carts/:id', authorizationId, CustomerController.readOneCartProduct);

router.patch('/carts/:id', authorizationId, CustomerController.editQuantity);

router.delete('/carts/:id', authorizationId, CustomerController.deleteCartProduct);

module.exports = router;