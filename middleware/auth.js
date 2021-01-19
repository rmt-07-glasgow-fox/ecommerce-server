const { readToken } = require('../helpers/token')
const { User, Product } = require('../models')

async function authenticate(req, res, next) {
    try {
        // check token
        let { access_token } = req.headers
        if (!access_token) { return next({ name: 401, message: 'access_token is required' }) }

        // read token
        let decodedToken = readToken(access_token)
        console.log('>>> decodedToken : ', decodedToken)

        // check user
        let user = await User.findByPk(decodedToken.id)
        if (!user) { return next({ name: 404, message: 'User not found' }) }

        // add req.user = email, id, role
        req.user = {
            id: decodedToken.id,
            email: decodedToken.email,
            role: decodedToken.role
        }
        console.log('Authentic req.user : ', req.user)

        next()

    } catch (err) {
        return next(err)
    }
}

async function authorizeAdminOnly(req, res, next) {
    try {
        if (req.user.role !== 'admin') {
            console.log('you are not admin')
            return next({ name: 401, message: 'Admin only' })
        }

        if (req.user.role === 'admin') {
            console.log('>>> you are admin')
            return next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authenticate, authorizeAdminOnly
}