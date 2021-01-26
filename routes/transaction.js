const router = require('express').Router()

const TransactionController = require('../controller/transactionController')


router.get('/', TransactionController.fetchTransaction)
router.post('/', TransactionController.addTransaction)


module.exports = router