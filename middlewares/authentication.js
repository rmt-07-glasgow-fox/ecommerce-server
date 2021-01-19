const { validateToken } = require('../helpers/jsonwebtoken')
const { User,Product} = require('../models')

function authenticate(req, res, next){
    if(req.headers.access_token === undefined){
        next({name : 'Login Required'})
    }
    let decoded = validateToken(req.headers.access_token)
    User.findOne({
        where : {
            email : decoded.email
        }
    })
    .then(user => {
        if(user){
            req.user = {
                id : user.id,
                email : user.email
            }
            next()
        } else {
            next({name : 'Login Required'})
        }
    })
    .catch(err => {
       next(err)
    })
}

function authorization(req, res, next){
    const id = req.params.id
    const userId = req.user.id
    Product.findOne({
        where : {
            id
        }
    })
    .then(product => {
        if(product === null){
            next({name : "Not found"})
        } else if(product.UserId === userId){
            next()
        } else {
            next({name : 'Do not have access'})
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {
    authenticate,authorization
}