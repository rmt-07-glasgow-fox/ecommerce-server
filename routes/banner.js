const express = require('express');
const router = express.Router();

const { create, list, update, destroy } = require('../controllers/banner');
const requireAdmin = require('../helpers/requireAdmin');

router.post('/', requireAdmin, create);
router.get('/', list);
router.put('/:id', requireAdmin, update);
router.delete('/:id', requireAdmin, destroy);

module.exports = router;
