const router = require('express').Router()
const {
  create,
  wishlists,
  wishlistsUser,
  wishlist,
  update,
  destroy
} = require('../controllers/wishlist')
const {authentificate, authorize} = require('../middleware/auth')

router.use(authentificate)
router.post('/', create)
router.get('/', wishlists)
router.get('/user', wishlistsUser)
router.get('/:id', wishlist)

router.put('/:id', authorize, update)
router.delete('/:id', authorize, destroy)

module.exports = router
