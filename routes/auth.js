const UserController = require('../controllers/userController')
const router = require('express').Router();

router.post('/register', UserController.registerUser);
router.post('/admin', UserController.loginUserAdmin);
router.post('/customer', UserController.loginUserCustomer);

module.exports = router