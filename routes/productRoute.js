const { ProductController } = require('../controllers/productController')
const { authorization } = require('../middlewares/auth')

const router = require('express').Router()

router.use(authorization)

router.post('/', ProductController.create)

router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)

router.put('/:id', ProductController.update)

router.delete('/:id', ProductController.delete)


module.exports = router