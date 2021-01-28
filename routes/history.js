const router = require('express').Router()
const HistoryController = require('../controllers/historyController')

router.get('/',HistoryController.get)
router.post('/',HistoryController.create)

module.exports = router