const express = require('express');
const router = express.Router();

const { create, list, incrementQty, decrementQty, destroy } = require('../controllers/cart');
const requireToken = require('../helpers/requireToken');

router.post('/', requireToken, create);
router.get('/', requireToken, list);
router.patch('/:id/increment', requireToken, incrementQty);
router.patch('/:id/decrement', requireToken, decrementQty);
router.delete('/:id', requireToken, destroy);

module.exports = router;
