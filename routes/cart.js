const router = require('express').Router();
const cartController = require('../controllers/cartController')

router.get('/', cartController.getAll);
router.post('/add', cartController.createOrUpdateCart);
router.delete('/:id', cartController.destroy);

module.exports = router