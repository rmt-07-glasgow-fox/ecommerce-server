const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {
    static login(req, res, next) {
        console.log('masuk login')
        const { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {
                if (!user) {
                    next({ name: "Invalid Email/Password" })
                }

                const check = comparePassword(password, user.password)
                if (check) {
                    const payload = {
                        id: user.id,
                        email: user.email
                    }
                    const access_token = generateToken(payload)
                    return res.status(200).json({ access_token })
                } else {
                    next({ name: "Invalid Email/Password" })
                }
            })
            .catch(err => {
                console.log(err.stack, 'ini error')
                next(err)
            })
    }

    static register(req, res, next){
        console.log(req.body, 'masuk register bray')
        const { email, password } = req.body
        User.create({ email, password, role: 'customer' })
        .then(user => {
            console.log('berhasil')
            const payload = {
                id: user.id,
                email: user.email
            }
            const access_token = generateToken(payload)
            const registeredUser = {
                email: user.email,
                access_token: access_token
            }
            return res.status(201).json(registeredUser)
        })
        .catch(err => {
            console.log(err.stack)
            next(err)
        })
    }
}

module.exports = Controller