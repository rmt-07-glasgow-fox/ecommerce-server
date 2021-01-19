const { verifyToken } = require('../helpers/jsonwebtoken')
const { User } = require('../models')

function authAdmin(req, res, next) {
    let email = req.body.email || req.email
    User.findOne({
        where: { email }
    })
        .then(data => {
            if(data.role !== 'admin') {
                next({ name: 'Not Admin'})
            } else {
                next()
            }
        })
        .catch(next)
}

function authenticate(req, res, next) {
    try {
        let decoded = verifyToken(req.headers.access_token)
        User.findOne({
            where: { email: decoded.email }
        })
            .then(data => {
                if(!data) {
                    next({ name: 'Invalid Input'})
                } else {
                    req.email = data.email
                    next()
                }
            })
            .catch(next)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authAdmin,
    authenticate
}