const { checkPass } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const { User } = require('../models')

class UserController {
    static async login (req, res, next) {
        const {email, password} = req.body
        try {
            const find = await User.findOne({
                where: { email }
            })
            if (find) {
                const matchPassword = checkPass(password, find.password)
                if (matchPassword) {
                    const data = {
                        id: find.id,
                        email: find.email,
                        password: find.password
                    }
                    const access_token = generateToken(data)
                    res.status(200).json({access_token})
                } else {
                    next({
                        name: 'failLogin'
                    })
                }
            } else {
                next({
                    name: 'failLogin'
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController