const { verifyToken } = require('../helpers/jwt')
const { User, Product } = require('../models')

async function adminAuthenticate(req, res, next){
    try {
        let decoded = verifyToken(req.headers.access_token)

        let result = await User.findOne({
            where: {
                email: decoded.email
            }
        })

        if(result.role === 'admin'){
            req.user = result
            next()
        } else {
            return res.status(400).json({
                message: "You don't have permission"
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

// async function adminAuthorize(req, res, next){
//     try {
//         if(req.user.role === 'admin'){
//             next()
//         } else {
//             res.status(401).json({
//                 message: "You don't have permission!"
//             })
//         }
//     } catch (error) {
        
//     }
// }

module.exports = {
    adminAuthenticate
}