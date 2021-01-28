const express = require('express');
const router = express.Router();

const { checkout, list, updateStatus } = require('../controllers/order');
const requireToken = require('../helpers/requireToken');

router.post('/', requireToken, checkout);
router.get('/', requireToken, list);
router.put('/:id/status', updateStatus);

module.exports = router;
