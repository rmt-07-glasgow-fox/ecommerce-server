const router = require('express').Router()
const { authorize2 } = require('../middlewares/auth.js')
const Controller = require('../controllers/controllerCart')

router.get('/', Controller.showAll)
router.post('/', Controller.addNew)

router.use('/:id', authorize2)
router.patch('/:id', Controller.editCart)
router.delete('/:id', Controller.deleteCart)

module.exports = router