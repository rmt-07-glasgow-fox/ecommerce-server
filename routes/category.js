const CategoryController = require('../controllers/categoryController')
const Auth = require('../middlewares/auth')
const router = require('express').Router()

router.get('/', CategoryController.findAll)
router.get('/:id', CategoryController.findByPk)
router.use(Auth.authentication)
router.use(Auth.authorizationAdmin)
router.post('/', CategoryController.create)
router.put('/:id', CategoryController.update)
router.delete('/:id', CategoryController.delete)

module.exports = router