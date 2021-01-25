const router = require('express').Router()

const userController = require('../controllers/userController')

router.post('/adminLogin', userController.adminLogin)
// router.post('/customerLogin', userController.customerLogin)

module.exports = router