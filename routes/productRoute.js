const { ProductController } = require('../controllers/productController')
const { authentication, adminAuthorization } = require('../middlewares/auth')

const router = require('express').Router()

router.post('/', authentication, adminAuthorization, ProductController.create)

router.get('/', authentication, ProductController.findAll)
router.get('/categories', ProductController.categories)
router.get('/:id', authentication, ProductController.findOne)

router.put('/:id', authentication, adminAuthorization, ProductController.update)
router.delete('/:id', authentication, adminAuthorization, ProductController.delete)


module.exports = router