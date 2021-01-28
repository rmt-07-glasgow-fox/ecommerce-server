const router = require('express').Router()
const { authentication } = require('../middleware/auth')
const {errHandler} = require('../middleware/errHandler')
const routerAuth = require('./auth')
const routerProduct = require('./product')
const routerCart = require('./cart')
const routerHistory = require('./history')

router.use(routerAuth)

router.get('/',(req,res)=>{
    res.status(200).json({message: 'this is e-commerce server'})
})

router.use('/products',routerProduct)
router.use(authentication)
router.use('/histories',routerHistory)
router.use('/carts',routerCart)

router.use(errHandler)

module.exports = router