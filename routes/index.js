const router = require('express').Router();
const ControllerUser = require('../controllers/userController')

router.post('/register', ControllerUser.register)

module.exports = router