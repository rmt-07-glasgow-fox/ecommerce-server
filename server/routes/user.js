const router = require('express').Router()
const Controller = require("../controllers/user")

router.post('/login', Controller.login)

module.exports = router