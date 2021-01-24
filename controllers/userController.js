const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {
    static login( req, res, next ) {
        let email = req.body.email
        let password = req.body.password

        const condition = {
            where: {
                email: email
            }
        }
        User.findOne(condition)
        .then( data => {
            if (!data) {
                next({name: 'Unauthorized'})
            }

            let match = comparePassword(password, data.password)
            if (match) {
                const payload = {
                    id: data.id,
                    email: data.email,
                    role: data.role
                }
                const access_token = generateToken(payload)
                return res.status(200).json({ 
                    id: data.id,
                    email: data.email,
                    role: data.role,
                    access_token: access_token 
                })
            } else{
                next({name: 'Unauthorized'})
            }
        })
        .catch( err => {
            next(err)
            // res.send(err)
        })
    }

    static register(req, res, next)  {
        let newData = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        User.create(newData)
        .then(data => {
            let showData = {
                id: data.id,
                email: data.email,
                role: data.role
            }
            res.status(201).json(showData)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller