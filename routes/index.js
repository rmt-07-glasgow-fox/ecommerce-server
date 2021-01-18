const router = require('express').Router();
const ControllerUser = require('../controllers/userController')

router.post('/login', ControllerUser.login)

module.exports = router