const express = require('express');
const router = express.Router();

const { login, loginAdmin, register } = require('../controllers/user');

router.post('/login', login);
router.post('/login/admin', loginAdmin);
router.post('/register', register);

module.exports = router;
