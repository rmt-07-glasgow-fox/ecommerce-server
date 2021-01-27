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
                        role: find.role
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
    static async register (req, res, next) {
        const { email, password } = req.body
        const role = 'customer'
        try {
            const create = await User.create({
                email,
                password,
                role
            })
            res.status(201).json({
                id: create.id,
                email,
                role
            })
            console.log(create.password)
            // console.log(email, password, 'asdasd')
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = UserController