const { User } = require('../models')
const { isPasswordValid } = require('../helpers/password')

class UserController {

    static async login(req, res, next) {
        try {
            let { email, password } = req.body
            if (!email || !password) { return next({ name: 400, message: 'email / password is required' }) }

            // check email
            let user = await User({ where: { email } })
            if (!user) {
                return next({ name: 404, message: 'email is not registered' })
            }

            // check password
            if (!isPasswordValid(password, user.password)) {
                return next({ name: 400, message: 'password is not matched' })
            }

            let response = {
                id: user.id,
                email: user.email,
                role: user.role
            }

            res.status(200).json(response)

        } catch (err) {
            return next(err)
        }
    }

}

module.exports = UserController