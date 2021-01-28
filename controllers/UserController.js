const { User } = require('../models')
const { genToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcryptjs')

class UserController {
    static login(req, res, next) {
        let { email, password } = req.body

        User.findOne({where: {email}})
        .then(user => {
            if (!user) {
                next({name: 'NotLogin', message: 'invalid email/password'})
            } else {
                let payload = {
                    id: user.id,
                    email: user.email
                }
                if (comparePassword(password, user.password)) {
                    res.status(200).json({access_token: genToken(payload)})
                } else {
                    next({name: 'NotLogin', message: 'invalid email/password'})
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static register(req, res, next) {
        let obj = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(obj)
        .then(data => {
            res.status(201).json({id: data.id, email: data.email})
        })
        .catch(next)
    }
}

module.exports = UserController