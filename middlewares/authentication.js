const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next){
    const { access_token } = req.headers
    try {
        if(!access_token){
            throw {
                name: "noAuthentication",
                status: 401
            }
        }
        else{
            const decoded = verifyToken(access_token)
            console.log(decoded)
            const user = await User.findOne({where: { id: decoded.id }})
            if(!user){
                throw {
                    name: "noAuthentication",
                    status: 401
                }
            }
            else {
                req.loggedInUser = user
                next() 
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authentication