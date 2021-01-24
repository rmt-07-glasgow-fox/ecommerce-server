const { validToken } = require("../helpers/jwt.js")
const { User } = require("../models")

async function isLogin(req, res, next) {
    try {
        let decoded = validToken(req.headers.access_token)
        let valid = await User.findOne({
            where: {
                email: decoded.email
            }
        })
        if (!valid) {
            next({
                message: "login first please",
                code: 401,
                from: 'function islogin'
            })
        } else {
            req.user = valid
            next()
        }
    } catch (err) {
        next({
            message: err.message,
            code: 400,
            from: 'function islogin'
        })
    }

}

module.exports = isLogin