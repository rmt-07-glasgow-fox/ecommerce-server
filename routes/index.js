const router = require('express').Router();

const userRoutes = require('./user.js');

router.use(userRoutes);

module.exports = router;