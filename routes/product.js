const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')
const { authorize } = require('../middlewares/auth')


router.post('/',authorize, productController.insert)
router.get('/',authorize, productController.findAll)
router.put('/:id',authorize, productController.update)
router.patch('/:id',authorize, productController.patch)
router.delete('/:id',authorize, productController.delete)




module.exports = router