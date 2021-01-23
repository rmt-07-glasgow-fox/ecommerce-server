const routes = require('express').Router()
const roleAuthorization = require('../middlewares/role-authorization')
const checkid = require('../middlewares/check-bannerid')
const { BannerController } = require('../controllers')

routes.get('/banners', BannerController.getBanner)
routes.get('/banners/:id', checkid, BannerController.getBannerById)

//authorization
routes.use(roleAuthorization)
routes.post('/banners', BannerController.addBanner)

//check id first
routes.use('/banners/:id', checkid)
routes.put('/banners/:id', BannerController.editBanner)
routes.delete('/banners/:id', BannerController.deleteBanner)


module.exports = routes