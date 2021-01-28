const {User, Product } = require('../models')
const {cekToken} = require('../helpers/jwt')

function authentication (req, res, next)  {
    try {
        let decoded = cekToken(req.headers.access_token)
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

function authorize(req, res, next) {
    if (req.user) {
        if (req.user.role == 'admin') {
            next()
        } else {
            next({name: 'Forbidden'})
        }
    } else {
        next({name: 'Forbidden'})
    }
}

module.exports = {
    authentication,
    authorize
}
