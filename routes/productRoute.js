const { ProductController } = require('../controllers/productController')
const { authentication, adminAuthorization } = require('../middlewares/auth')

const router = require('express').Router()

router.post('/', authentication, adminAuthorization, ProductController.create)

router.get('/', ProductController.findAll)
router.get('/categories', ProductController.categories)
router.get('/:id', ProductController.findOne)

router.put('/:id', adminAuthorization, ProductController.update)
router.delete('/:id', adminAuthorization, ProductController.delete)


module.exports = router