const { user } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {
    static register(req, res, next) {
        let newuser = {
            email: req.body.email,
            password: req.body.password
        }
        let dataUser

        user.create(newuser)
            .then(data => {
                dataUser = {
                    id: data.id,
                    email: data.email,
                    role: data.role
                }
                res.status(201).json({ user: dataUser })
            })
            .catch(err => {
                res.status(500).json({ message: "Invalid internal server" })
            })
    }

    static login(req, res, next) {
        let login = {
            email: req.body.email,
            password: req.body.password
        }
        if (login.email === '' || login.password === '') {
            return res.status(400).json({ message: 'Email or password cannot be empty' })
        } else {
            user.findOne({
                where: {
                    email: login.email
                }
            })

                .then(data => {
                    if (data) {
                        let data_login = data.dataValues
                        const passMatch = comparePassword(login.password, data_login.password)
                        if (passMatch) {
                            let payload = {
                                id: data_login.id,
                                email: data_login.email
                            }
                            const access_token = generateToken(payload)
                            return res.status(200).json({ access_token })
                        } else {
                            return res.status(400).json({ message: 'Invalid Email or Password' })
                        }
                    } else {
                        return res.status(400).json({ message: 'Invalid Email or Password' })
                    }
                })
                .catch(err => {
                    res.status(500).json({ message: 'Internal server error' })
                })
        }
    }
}

module.exports = UserController