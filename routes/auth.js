const UserController = require('../controllers/userController')
const router = require('express').Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

module.exports = router