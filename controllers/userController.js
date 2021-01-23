const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt.js')
const { compare } = require('bcryptjs')


class UserController {

    static registerHandler(req, res, next) {

        const { name, email, password } = req.body

        User.create(req.body)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static loginHandler(req, res, next) {

        const { email, password } = req.body

        User.findOne({
            where: {
                email
            }
        })
            .then(data => {
                if(!data) {
                    next({name: "Invalid"})
                }
                
                let matchPassword = comparePassword(password, data.password)

                if(!matchPassword) {
                    next({name: "Invalid"})
                }
                
                if(data && matchPassword) {

                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    
                    const access_token = generateToken(payload)
            
                    res.status(200).json({
                        access_token
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController