const ProductController = require('../controllers/productController')
const Auth = require('../middlewares/auth')

const router = require('express').Router()

router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findByPk)
router.use(Auth.authentication)
router.use(Auth.authorizationAdmin)
router.post('/', ProductController.create)
router.put('/:id', ProductController.update)
router.patch('/:id', ProductController.updateStock)
router.delete('/:id', ProductController.delete)

module.exports = router