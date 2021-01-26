const router = require('express').Router()
const Controller = require('../controllers/cartController')

router.get('/', Controller.showCart)
router.post('/', Controller.addCart)
router.patch('/inc', Controller.increase)
router.patch('/dec', Controller.decrease)
router.delete('/', Controller.destroy)

module.exports = router