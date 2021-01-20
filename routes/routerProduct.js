const ProductController = require('../controller/productController')
const router = require('express').Router()
 

router.post('/create', ProductController.create)
router.put('/update/:id', ProductController.update)



module.exports = router