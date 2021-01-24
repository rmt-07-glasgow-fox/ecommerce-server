const ProductController = require('../controller/productController')
const router = require('express').Router()
 
router.get('/', ProductController.getall)
router.post('/create', ProductController.create)
router.put('/update/:id', ProductController.update)
router.delete('/delete/:id', ProductController.delete)



module.exports = router