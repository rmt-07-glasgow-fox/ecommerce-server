const router = require('express').Router();
const { authenticate } = require('../middlewares/auth.js');

const WishlistController = require('../controllers/wishlist.js');

router.use(authenticate);
router.post('/', WishlistController.add);
router.get('/', WishlistController.getAll);
router.delete('/:id', WishlistController.delete);


module.exports = router;