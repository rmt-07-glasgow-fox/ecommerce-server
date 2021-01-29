const routs = require('express').Router()
const user = require('./user')
const product = require('./product')

routs.get('/',(req,res)=>{
    res.send({message:'WELCOME'})
})
routs.use(user)
routs.use(product)

module.exports = routs