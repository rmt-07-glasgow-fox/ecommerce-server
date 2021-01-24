const express = require('express')
const router = express.Router()
const Controller = require('../controller/userCont')

router.post('/login', Controller.login)

module.exports = router;