const router = require('express').Router()
const { authAdmin } = require('../middleware/auth')
const {errHandler} = require('../middleware/errHandler')
const routerAuth = require('./auth')
const routerProduct = require('./product')

router.use(routerAuth)

router.get('/',(req,res)=>{
    res.status(200).json({message: 'this is e-commerce server'})
})
// router.use(authAdmin)
router.use('/products',routerProduct)
router.use(errHandler)

module.exports = router