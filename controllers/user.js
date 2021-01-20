const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateAccessToken } = require('../helpers/jsonwebtoken')

class UserController {

    static async loginAdmin(req, res, next) {
        const payload = {
            email: req.body.email || '',
            password: req.body.password || ''
        }

        try {
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            if (!user) {
                throw {
                    status: 400,
                    message: `Wrong Email or Password`
                }
            } else {
                if (user.role !== 'admin') {
                    throw {
                        status: 403,
                        message: `You Don't Have Access To This Panel`
                    }
                } else {
                    if (comparePassword(payload.password, user.password)) {
                        const access_token = generateAccessToken({
                            id: user.id,
                            email: user.email,
                            role: user.role
                        })

                        res.status(200).json({access_token})
                    } else {
                        throw {
                            status: 400,
                            message: `Wrong Email or Password`
                        }
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    }

}

module.exports = UserController