const router = require('express').Router()
const {
  create,
  carts,
  cartsUser,
  cart,
  update,
  destroy
} = require('../controllers/cart')
const {authentificate, authorize} = require('../middleware/auth')

router.use(authentificate)
router.post('/', create)
router.get('/', carts)
router.get('/user', cartsUser)
router.get('/:id', cart)

router.put('/:id', authorize, update)
router.delete('/:id', authorize, destroy)

module.exports = router
