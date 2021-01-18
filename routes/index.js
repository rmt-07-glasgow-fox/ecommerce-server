const express = require('express');
const router = express.Router();

const requireToken = require('../helpers/requireToken');

const userRoutes = require('./user');
const categoryRoutes = require('./category');
const bannerRoutes = require('./banner');

router.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

router.use('/users', userRoutes);

router.use(requireToken);

router.use('/categories', categoryRoutes);
router.use('/banners', bannerRoutes);

module.exports = router;
