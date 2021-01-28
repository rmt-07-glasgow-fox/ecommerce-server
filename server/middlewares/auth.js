const { tokenCheck } = require("../helpers/jwt")
const { User, Content } = require("../models")
const { comparePassword } = require('../helpers/bcrypt')

function authenticate(req, res, next) {
    console.log(req.headers.access_token, 'masuk authenticate')
    let decoded = tokenCheck(req.headers.access_token)
    console.log(decoded, 'ini decoded')
    User.findOne({
        where: {
            email: decoded.email
        }
    })
        .then(user => {
            console.log(user, 'masuk user ga')
            if (!user) {
                next({ name: "SignInError" })
            } else {
                console.log('ada user')
                req.user = user
                next()
            }
        })
        .catch(err => {
            console.log(err.stack, "KENAWHY")
            next(err)
        })
}

function authorizeAdmin(req, res, next) {
    console.log('authadmin')
    User.findOne({
        where: {
            role: req.user.role
        }
    })
        .then(user => {
            if (!user || user.role !== "admin" || user.email !== 'admin@mail.com' || comparePassword(process.env.PASSWORD, user.password) === false ) {
                next({ name: "AccessError" })
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

function authorizeCustomer(req, res, next) {
    console.log('AUTH CUSTOMER=======')
    User.findOne({
        where: {
            role: req.user.role
        }
    })
        .then(user => {
            console.log(user.role, "ini apa ya?")
            if (!user || user.role !== "customer") {
                next({ name: "AccessError" })
            } else {
                console.log('mari kita next')
                next()
            }
        })
        .catch(err => {
            console.log(err.stack, 'KeNAAPA')
            next(err)
        })
}

module.exports = { authenticate, authorizeAdmin, authorizeCustomer }