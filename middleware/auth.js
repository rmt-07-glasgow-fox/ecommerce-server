const { verifyToken } = require('../helper/jwt')

const { User } = require('../models')

async function auth (req, res, next) {

    try {

        let accessToken = req.headers.access_token
        let decoded = verifyToken(accessToken)
        
        const user = await User.findOne({
            where : {email : decoded.email}
        })

        if(user) {
            req.userLogin = {
                id : user.id,
                email : user.email,
                role : user.role
            }

            next()
        } else {
            next( {name : 'userNotFound'} )
        }

    } catch (err) {
        next(err)
    }
}

async function author (req, res, next) {
    if(req.userLogin.role == 'admin') {
        next()
    } else {
        next( { name : 'notAuthorize' })
    }
}

module.exports = {
    auth, author
}