const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const isLoginAdmin = require('../middlewares/isLoginAdmin');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.get);
router.use(isLoginAdmin);
router.post('/', isAdmin, categoryController.store);
router.put('/:id', isAdmin, categoryController.update);
router.delete('/:id', isAdmin, categoryController.destroy);

module.exports = router