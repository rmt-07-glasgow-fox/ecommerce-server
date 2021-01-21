const { checkToken } = require('../helper/jwt')
const { User } = require('../models/index')

function authenticate(req, res, next)  {
    try {
        let decoded = checkToken(req.headers.access_token)
        User.findOne({
            where : {
                email: decoded.email 
            }
        })
        .then(userLogin => {
            if (!userLogin) {
                next({
                    name: "please login first" 
                })
            } else {
                req.user = {
                    id: +userLogin.id
                }
                next()
            }
        })
        .catch(err => {
            next(err.message)
        })
        
    } catch (err) {
        next({
            name: "please login first" 
        })
        
    }
}

function authorize(req, res, next) {
    let decoded = checkToken(req.headers.access_token)
    if (decoded.role !== 'admin') {
        next({
            name: "unauthorize" 
        })
    } else {
        next()
    }
}


module.exports = { 
    authenticate,
    authorize
}