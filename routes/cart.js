const router = require('express').Router()
const { CartController } = require('../controllers')
const { authentication, authorize } = require('../middlewares/auth') 

router.use(authentication)
router.post('/', CartController.addEditCart)
// router.get('/', CartController.fetch)

// router.get('/histories', CartController.fetchHistory)
// router.delete('/', /* authorize, */ CartController.delete)

// router.put('/', CartController.checkout)

module.exports = router
