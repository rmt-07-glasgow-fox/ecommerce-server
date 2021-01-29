const { checkToken } = require('../helpers/jwt.js')
const { User, Product, Cart, CartProduct } = require('../models')

async function authenticate(req, res, next) {
    try {
        const user = checkToken(req.headers.access_token)
        const found = await User.findByPk(user.id)

        if (!found) next({ name: "notLogin" })
        else {
            req.user = found.id
            next()
        }
    } catch (err) {
        next(err)
    }
}

async function authorize(req, res, next) {
    try {
        const getId = +req.params.id
        const found = await Product.findByPk(getId)
        
        if (!found) next({ name: "notFound" })

        const match = (found.UserId === req.user)

        if (!match) next({ name: "unauthorized" })
        else next()
    } catch (err) {
        next(err)
    }
}

async function authorize2(req, res, next) {
    try {
        const getId = +req.params.id
        const found = await CartProduct.findByPk(getId)
        
        if (!found) next({ name: "notFound" })
        const cart = await Cart.findByPk(found.CartId)

        if (!cart) next({ name: "notFound" })
        const match = (cart.UserId === req.user)

        if (!match) next({ name: "unauthorized" })
        else next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authorize, authenticate, authorize2
}