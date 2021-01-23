const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

module.exports = class UserController {
    static async register(req, res, next) {
        try {
            let newUser = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: 'customer'
            }

            let user = await User.create(newUser);
            let { id, name, email, role } = user;

            res.status(201).json({ id, name, email, role });
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body
            let user = await User.findOne({ where: { email }})
            let isLogin = !user ? false : comparePassword(password, user.password)

            if (!isLogin) throw new Error ('InvalidEmailPassword');
            res.status(200).json({
                access_token: generateToken({ email: user.email })
            })
        } catch (error) {
            next(error)
        }
    }
}