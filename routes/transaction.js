const routes = require('express').Router()
const { TransactionController } = require('../controllers')
const custAuth = require('../middlewares/cust-authorization')
const checkId = require('../middlewares/check-transactionid')

routes.get('/transaction', TransactionController.getTransaction)
routes.get('/history', TransactionController.history)

routes.use('/transaction', custAuth)
routes.use('/transaction/:id', checkId)
routes.delete('/transaction/:id', TransactionController.deleteTransaction)
routes.put('/transaction/:id', TransactionController.checkout)

module.exports = routes