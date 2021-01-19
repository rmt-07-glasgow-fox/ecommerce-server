const router = require('express').Router();
const productionController = require('../contollers/productController');
const authorization = require('../middlewares/authorization');

router.use(authorization);

router.post('/', productionController.create);

router.get('/', productionController.read);

router.put('/:id', productionController.update);

router.patch('/:id', productionController.editStock);

router.delete('/:id', productionController.delete);

module.exports = router;