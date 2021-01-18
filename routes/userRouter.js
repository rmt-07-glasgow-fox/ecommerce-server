const router = require('express').Router()
const userController = require("../controllers/userController.js")

router.post('/', userController.login)

module.exports = router