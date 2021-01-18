const { checkPass } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const { User } = require('../models')

class UserController {
    static async login (req, res) {
        const { email, password } = req.body
        try {
            const admin = await User.findOne( {where: { email }})
            const userPassword = await checkPass(password, find.password)
            if (admin && userPassword) {
                const access_token = generateToken({email, password})
                res.status(200).json(access_token)
            } else {
                res.status(400).json({
                    msg: 'email or password is undefined'
                })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = UserController