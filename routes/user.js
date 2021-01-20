const routes = require('express').Router()
const { UserController } = require('../controllers')

routes.post('/login/admin', UserController.loginAdmin)

module.exports = routes