const { CategoryController } = require('../controllers')
const routes = require('express').Router()
const roleAuthorization = require('../middlewares/role-authorization')
const checkid = require('../middlewares/check-categoryid')

//authorization
routes.use(roleAuthorization)
routes.post('/categories', CategoryController.addCategory)

//check valid id
routes.use('/categories/:id', checkid)
routes.put('/categories/:id', CategoryController.putCategory)
routes.delete('/categories/:id', CategoryController.deleteCategory)

module.exports = routes