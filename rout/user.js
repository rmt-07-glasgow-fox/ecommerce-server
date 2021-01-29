const routs = require('express').Router()
const user = require('../controllers/user')

routs.post('/register',user.register)
routs.post('/login',user.login)
routs.post('/checktoken',user.checktoken)

module.exports = routs