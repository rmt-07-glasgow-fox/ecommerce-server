const {checkToken} = require("../helpers/jwt")
const {User, Product} = require("../models")

function authentication(req, res, next) {
    const authParams = checkToken(req.headers.access_token)
    User.findOne({where: {email: authParams.email}})
    .then(user => {
        if (!user) {
            next({name: 'EmailInvalid'})
        } else {
            req.user = user
            next()
        }
    })
    .catch(err => {
        next(err)
    })

}

function authorization(req, res, next) {
    const authParams = checkToken(req.headers.access_token)
    Product.findByPk(+req.params.id)
    .then(Product => {
        if (!Product) {
            next({name: 'requestNotFound'})
        } else {
            if (Product.UserId === authParams.id) {
                next()
            } else {
                next({name: 'accessDenied'})
            }
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {authentication, authorization}