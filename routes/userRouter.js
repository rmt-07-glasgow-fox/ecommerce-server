const router = require('express').Router()
const userController = require("../controllers/userController.js")

router.post('/register', userController.regist)
router.post('/login', userController.login)

module.exports = router