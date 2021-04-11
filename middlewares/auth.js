const { verifyToken } = require('../helpers/jsonwebtoken')
const { User, Cart } = require('../models')

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
                    req.UserId = data.id
                    next()
                }
            })
            .catch(next)
    } catch (err) {
        next(err)
    }
}

function authCust (req, res, next) {
    let id = req.params.id
    Cart.findOne({
        where: { id }
    })
        .then(data => {
            if (data.UserId == +req.UserId) {
                next()
            } else {
                next({ name: 'Unauthorized'})
            }
        })
        .catch(next)
}

module.exports = {
    authAdmin,
    authenticate,
    authCust
}