const TransactionController = require('../controllers/transactionController')
const Auth = require('../middlewares/auth')

const router = require('express').Router()
router.use(Auth.authentication)
router.get('/', TransactionController.findByCust)

module.exports = router