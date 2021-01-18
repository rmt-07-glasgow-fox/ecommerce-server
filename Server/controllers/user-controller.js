const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {
    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({
            where: { email }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: 'Invalid email/password!',
                        code: 401,
                        from: 'Controller User: Login User'
                    })
                }

                const isValid = comparePassword(password, data.password)
                if (isValid) {
                    const payload = {
                        id: data.id,
                        email: data.email
                    }

                    const access_token = generateToken(payload)
                    res.status(200).json({ access_token })
                } else {
                    next({
                        message: 'Invalid email/password!',
                        code: 401,
                        from: 'Controller User: Login User'
                    })
                }
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'Controller User: Login User'
                })
            })
    }
}

module.exports = Controller