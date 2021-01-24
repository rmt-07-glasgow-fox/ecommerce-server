const { tokenCheck } = require("../helpers/jwt")
const { User, Content } = require("../models")

function authenticate(req, res, next) {
    let decoded = tokenCheck(req.headers.access_token)
    User.findOne({
        where: {
            email: decoded.email
        }
    })
        .then(user => {
            if (!user) {
                next({ name: "SignInError" })
            } else {
                req.user = user
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

function authorize(req, res, next) {
    User.findOne({
        where: {
            role: req.user.role
        }
    })
        .then(user => {
            if (!user || user.role !== "admin") {
                next({ name: "AccessError" })
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = { authenticate, authorize }