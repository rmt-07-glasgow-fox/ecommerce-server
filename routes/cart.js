const routes = require('express').Router()
const { CartController } = require('../controllers')
const custAuth = require('../middlewares/cust-authorization')
const cekproductid = require('../middlewares/check-productid')
const getTransactionId = require('../middlewares/transactionId')
const checkCartId = require('../middlewares/check-cartid')

routes.use('/cart', custAuth)
routes.use('/cart', getTransactionId)
routes.post('/cart/:id', cekproductid, CartController.addCart)

routes.use('/cart/:id', checkCartId)
routes.put('/cart/:id', CartController.editCart)
routes.delete('/cart/:id', CartController.destroyCart)

module.exports = routes