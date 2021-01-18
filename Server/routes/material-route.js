const route = require('express').Router()
const Controller = require('../controllers/material-controller')
const { authentication, authorization } = require('../middlewares/auth')

// routing and endpoints
route.use(authentication)

route.get('/materials', Controller.showAllMaterial)
route.get('/materials/:id', Controller.showById)
route.get('/materials/category/:category', Controller.showByCategory)

route.post('/materials', authorization, Controller.createMaterial)
route.put('/materials/:id', authorization, Controller.updateMaterial)
route.delete('/materials/:id', authorization, Controller.deleteMaterial)

module.exports = route