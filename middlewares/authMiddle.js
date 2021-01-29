const { cekToken } = require("../helpers/jwt")
const { Product, User, Cart } = require('../models')

const authentication = (req, res, next) => {
    try {
        let decoded = cekToken(req.headers.access_token)
        User.findOne({
            where: {
                email: decoded.email
            }
        })
        .then(data => {
            if (!data) {
                next({name: "notLogin"})
            } else {
                req.user = data
                next()
            }
        })
        .catch(err => {
            next(err)
        })
    } catch (err) {
        next({name: "notLogin"})
    }
}

const authorization = (req, res, next) => {
    let decoded = cekToken(req.headers.access_token)
    let id = +req.params.id
    Product.findByPk(id)
    .then(data => {
        if (!data) {
            next({name: 'resourceNotFound'})
        } else if(decoded.role == 'admin'){
            next()
        } else {
            next({name: 'unauthorized'})
        }
    })
    .catch(err => {
        next(err)
    })
}

const authorizationCart = (req, res, next) => {
    let decoded = cekToken(req.headers.access_token)
    Cart.findOne({where: {
        UserId: req.user.id
    }})
    .then(data => {
        console.log(req.user.id);
        if (!data) {
            next({name: 'resourceNotFound'})
        } else if(decoded.id == req.user.id){
            next()
        } else {
            next({name: 'unauthorized'})
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {authentication, authorization, authorizationCart}