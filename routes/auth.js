const router = require('express').Router()
const ControllerAuth = require('../controllers/controllerAuth.js')

router.post('/register', ControllerAuth.register)
router.post('/login', ControllerAuth.login)
router.post('/tokening', ControllerAuth.tokening)

router.get('/register', ControllerAuth.showUser)
router.delete('/register', ControllerAuth.deleteUser)

module.exports = router