const router = require('express').Router()
const user = require('../controller/user')


router.post('/login', user.login)


module.exports = router