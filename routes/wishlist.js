const router = require('express').Router();
const wishlistController = require('../controllers/wishlistController')

router.get('/', wishlistController.getAll);
router.post('/add', wishlistController.findOrCreate);
router.delete('/:id', wishlistController.destroy);

module.exports = router