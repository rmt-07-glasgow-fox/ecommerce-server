const {User} = require("../models")
const {comparePassword} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")

class userController {
    static register(req, res, next) {
        const {name, email, password} = req.body
        User.create({name, email, password})
        .then(user => {
            const {id, name, email} = user
            res.status(201).json({id, name, email})
        })
        .catch(err => next(err))
    }

    static login(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            next({name: 'EmptyInput'})
        }
        User.findOne({where: {email}})
        .then(user => {
            if (!user) {
                next({name: "ResourceNotFound"})
            } else {
                let match = comparePassword(password, user.password)
                if (!match) {
                    next({name: "ResourceNotFound"})
                } else {
                    const {id, email, role} = user
                    const access_token = generateToken({id, email, role})
                    res.status(200).json({access_token})
                }
            }
        })
        .catch(err => {
            next(err)
        })
        
    }
}

module.exports = userController