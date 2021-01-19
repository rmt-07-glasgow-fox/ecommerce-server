const { checkToken } = require('../helpers/jwt.js')
const { User, Product } = require('../models')

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

module.exports = {
    authorize, authenticate
}