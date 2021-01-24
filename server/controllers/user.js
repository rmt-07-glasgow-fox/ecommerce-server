const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {
    static login(req, res, next) {
        console.log(req.body, "body")
        const { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {
                console.log(user, "ada?")
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
                console.log(err, "ini err")
                next(err)
            })
    }
}

module.exports = Controller