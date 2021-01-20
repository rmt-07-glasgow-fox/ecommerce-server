const { ProductController } = require('../controllers')
const routes = require('express').Router()
const roleAuthorization = require('../middlewares/role-authorization')
const checkId = require('../middlewares/check-productid')

routes.get('/products', ProductController.getProduct)
routes.get('/products/:id', checkId, ProductController.getProductById)

routes.use(roleAuthorization) // ! roleauthorization
routes.use('/products/:id', checkId)
routes.post('/products', ProductController.postProduct)
routes.put('/products/:id', ProductController.putProduct)
routes.delete('/products/:id', ProductController.deleteProduct)

module.exports = routes