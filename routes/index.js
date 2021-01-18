const express = require('express');
const router = express.Router();

const userRoutes = require('./user');

router.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

router.use('/users', userRoutes);

module.exports = router;
