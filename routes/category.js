const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', categoryController.getAll);
router.post('/', isAdmin, categoryController.store);
router.put('/:id', isAdmin, categoryController.update);
router.delete('/:id', isAdmin, categoryController.destroy);

module.exports = router