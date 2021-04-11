const TransactionController = require('../controllers/transactionController')

const router = require('express').Router()

router.get('/', TransactionController.showTransaction)
router.post('/', TransactionController.createTransaction)

module.exports = router