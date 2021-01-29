const { checkToken } = require('../helpers/jwt')
const { User, Product } = require('../models')


function authentication(req, res, next) {
    try {
        let decoded = checkToken(req.headers.access_token)
        User.findOne({
            where: {
                email: decoded.email
            }
        })
        .then( data => {
            if (!data) {
                next({name: `Unauthorized`})
            }
            else{
                req.user = data
                next()
            }
        })
        .catch( err => {
            next(err)

        })
    } catch (err) {
        next(err)
    }
}

async function authorization(req, res, next) {
    
    try {
        let role = req.user.role
        if(role === 'admin') {
            next()
        }
        else {
            next({name:"NotAuthorized"})
        }
    }
    catch(error) {
        next(error)
    }
}

async function authorizationCustomer(req, res, next) {
    
    try {
        let role = req.user.role
        if(role === 'customer') {
            next()
        }
        else {
            next({name:"NotAuthorized"})
        }
    }
    catch(error) {
        next(error)
    }
}

module.exports = {
    authentication,
    authorization,
    authorizationCustomer
}