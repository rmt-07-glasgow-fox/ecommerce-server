const router = require('express').Router();
const bannerController = require('../controllers/bannerController');
const isLoginAdmin = require('../middlewares/isLoginAdmin');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', bannerController.getAll);
router.get('/:id', bannerController.get);
router.use(isLoginAdmin);
router.post('/', isAdmin, bannerController.store);
router.put('/:id', isAdmin, bannerController.update);
router.delete('/:id', isAdmin, bannerController.destroy);

module.exports = router