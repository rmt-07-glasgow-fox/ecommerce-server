const { User } = require('../models')
const { isPasswordValid } = require('../helpers/password')
const { generateToken } = require('../helpers/token')

class UserController {

    static async login(req, res, next) {
        try {
            // console.log('>>> req.body : ', req.body)
            let { email, password } = req.body
            if (!email || !password) { return next({ name: 400, message: 'email / password is required' }) }

            // check email
            let user = await User.findOne({ where: { email } })
            if (!user) {
                return next({ name: 404, message: 'email is not registered' })
            }

            // check password
            if (!isPasswordValid(password, user.password)) {
                return next({ name: 400, message: 'password is not matched' })
            }

            // admin only
            if (user.role !== 'admin') {
                return next({ name: 401, message: 'admin only !' })
            }

            let convertToken = {
                id: user.id,
                email: user.email,
                role: user.role
            }

            let token = generateToken(convertToken)

            res.status(200).json({ access_token: token })

        } catch (err) {
            return next(err)
        }
    }

}

module.exports = UserController