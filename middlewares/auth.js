const { checkToken } = require('../helpers/jwt')
const { User, Product } = require('../models')


async function authentication(req, res, next) {
    if (!req.headers.access_token) {
        next({name:"NotAuthorized"})
      }
    try {
        let decoded = checkToken(req.headers.access_token)
        let data = await User.findOne({ 
            where: {
            email: decoded.email
        }})
                if(!data) {
                    next({name: "invalid"})
                }
                else {
                    req.user = data
                }
                next()
    }
    catch(err) {
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