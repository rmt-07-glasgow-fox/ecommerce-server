const { User } = require('../models')
const { verifyJWT } = require('../helper/jwt')

async function authenticate (req, res, next) {
    try {
        const decode = verifyJWT(req.headers.access_token)
        const data = await User.findOne({
            where: { email: decode.email}
        })
        if (!data) {
            return next({
                name: 'undefined'
            })
        } else if (!decode) { 
            return next({
                name: 'access_token'
            })
        } else { 
            req.user = data
            next()
        }
    } catch (err) {
        next(err)
    }
}
async function authorization (req, res, next) {
    console.log(req.user.role);
    try {
        if (req.user.role.toLowerCase() === 'admin') next()
        else {
            return next({ 
                name: 'customer'
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { authenticate, authorization }