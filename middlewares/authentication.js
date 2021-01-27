const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = (req,res,next) => {
    try {
        const { access_token } = req.headers
        if (!access_token){
            throw {
                status: 401,
                message: "please login first"
            }
        } else {
            const decoded = verifyToken(access_token)
            req.loggedInUser = decoded
            User.findOne({where: {id: decoded.id}})
            .then(data => {
                if(data){
                    next()
                }else {
                    throw {
                        status: 401,
                        message: "please login first"
                    }
                }
            })
            .catch(error => {
                next(error)
            })  
        }
    } catch (error) {
        next(error)
    }
}