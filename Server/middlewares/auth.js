const { verifyToken } = require('../helpers/jwt')
const { User, Material } = require('../models')

function authentication(req, res, next) {
    try {
        let decoded = verifyToken(req.headers.access_token)

        User.findOne({
            where: { email: decoded.email }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: 'Please login first',
                        code: 401,
                        from: 'middleware: authentication'
                    })
                } else {
                    req.userId = data.id
                    req.userRole = data.role
                    next()
                }
            })
    } catch (error) {
        next({
            message: error.message,
            code: 500,
            from: 'middleware: authentication'
        })
    }
}

function authorization(req, res, next) {
    const role = req.userRole

    if(role !== 'admin') {
        next({
            message: 'disallowed',
            code: 401,
            from: 'middleware: authorization'
        })
    } else {
        next()
    }
}

module.exports = { authentication, authorization }