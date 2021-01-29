const { User, Product } = require ("../models")
const { checkToken } = require("../helpers/jwt")

checkLogin = async (req, res, next) => {
    try {
        const token = req.headers.access_token
        const verified = checkToken (token)
        // console.log(verified)
        // console.log(token)
        const user = await User.findOne ({ where: { email: verified.email } })
        // console.log(user)

        if (user) {
            req.user = user
            next()
        } else {
            next({ name: "NotLoggedIn" })
        }
    } catch (err) {
        next(err)
    }
}

authorization = async (req, res, next) => {
    try {
        const id = +req.params.id
        let product = await Product.findByPk(id)

        if (product) {
            next()
        } else {
            next({ name: "Unauthorized" })
        }
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = {
    checkLogin,
    authorization
}