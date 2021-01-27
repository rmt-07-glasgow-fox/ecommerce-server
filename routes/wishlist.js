const express = require("express")
const router = express.Router()
const WishlistController = require('../controllers/wishlistController')
const {authenticate} = require('../middlewares/authenticate')

router.use(authenticate)
router.get('/', WishlistController.getAll)
router.post('/:ProductId', WishlistController.add)

router.delete('/:id', WishlistController.delete)

module.exports = router