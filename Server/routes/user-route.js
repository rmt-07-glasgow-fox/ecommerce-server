const route = require('express').Router()
const Controller = require('../controllers/user-controller')

// routing and endpoints
route.post('/login', Controller.login)

module.exports = route