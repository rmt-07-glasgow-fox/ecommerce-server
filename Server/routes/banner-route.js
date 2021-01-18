const route = require('express').Router()
const Controller = require('../controllers/banner-controller')
const { authentication, authorization } = require('../middlewares/auth')

// routing and endpoints
route.use(authentication)

route.get('/banners', Controller.showBanner)

route.post('/banners', authorization, Controller.createBanner)
route.put('/banners/:id', authorization, Controller.updateBanner)
route.delete('/banners/:id', authorization, Controller.deleteBanner)

module.exports = route