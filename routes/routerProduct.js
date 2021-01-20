const ProductController = require('../controller/productController')
const router = require('express').Router()
 

router.post('/create', ProductController.create)
router.put('/update/:id', ProductController.update)
router.delete('/delete/:id', ProductController.delete)



module.exports = router