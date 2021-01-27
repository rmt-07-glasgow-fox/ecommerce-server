const router = require('express').Router()
const Controller = require('../controllers/wishController')

router.post('/', Controller.create)
router.get('/', Controller.showWish)
router.delete('/', Controller.destroy)

module.exports = router