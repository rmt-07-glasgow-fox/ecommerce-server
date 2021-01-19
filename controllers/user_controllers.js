const { User } = require('../models')

class UserController {
    static register(req, res, next) {
        const { email, password, role } = req.body
        const obj = {
            email,
            password,
            role
        }
        User.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static login(req, res, next) {

    }
}

module.exports = { UserController }