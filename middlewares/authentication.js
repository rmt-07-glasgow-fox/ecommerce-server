const { User } = require('../models')
const { decodeAccessToken } = require('../helpers/jsonwebtoken')

module.exports = async (req, res, next) => {
    const access_token = req.headers.access_token

    try {
        if (!access_token) {
            throw {
                status: 401,
                message: `Please Login First`
            }
        } else {
            const decoded = decodeAccessToken(access_token)
            const user = User.findOne({
                where: {
                    email: decoded.email
                }
            })

            if (!user) {
                throw {
                    status: 401,
                    message: `Please Login First`
                }
            } else {
                req.loggedIn = decoded
                next()
            }
        }    
    } catch (error) {
        next(error)
    }
}