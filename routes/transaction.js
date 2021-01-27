const router = require('express').Router();
const transactionController = require('../controllers/transactionController')

router.get('/history', transactionController.history);
router.post('/checkout', transactionController.checkout);

module.exports = router