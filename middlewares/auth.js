const { verifyToken } = require('../helpers/jwt')
const { User, Product, CartProduct } = require('../models')

async function customerAuthenticate (req, res, next) {
    try {
        let decoded = verifyToken(req.headers.access_token)

        let result = await User.findOne({
            where: {
                email: decoded.email
            }
        })

        if(result.role === 'customer'){
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

async function adminAuthenticate (req, res, next) {
    try {
        let decoded = verifyToken(req.headers.access_token)
        console.log(decoded, 'ini decoded')
        let result = await User.findOne({
            where: {
                email: decoded.email
            }
        })
        console.log(result, 'result admin auth')

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

async function customerAuthorize (req, res, next) {
    try {
        const result = await CartProduct.findOne({
            where: {
                id: req.params.id
            }
        })

        if(result || result === req.user.id){
            next()
        } else {
          return res.status(401).json({
                message: "You don't have permission!"
            })
        }
    } catch (error) {
      return res.status(500).json(error)
    }
}

module.exports = {
    adminAuthenticate,
    customerAuthenticate
}