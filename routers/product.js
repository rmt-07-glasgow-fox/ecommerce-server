const router = require('express').Router()
const Controller = require('../controllers/productController')
const {authorize} = require('../middlewares/auth')

router.post('/', Controller.create)
router.get('/', Controller.showProduct)

router.put('/:id', Controller.update)

module.exports = router