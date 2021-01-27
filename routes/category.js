const express = require('express');
const router = express.Router();

const { create, list, update, destroy } = require('../controllers/category');
const requireToken = require('../helpers/requireToken');
const requireAdmin = require('../helpers/requireAdmin');

router.post('/', requireToken, requireAdmin, create);
router.get('/', list);
router.put('/:id', requireToken, requireAdmin, update);
router.delete('/:id', requireToken, requireAdmin, destroy);

module.exports = router;
