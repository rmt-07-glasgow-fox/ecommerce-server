const router = require('express').Router()
const user = require('../controller/user')


router.get('/login', user.login)


module.exports = router