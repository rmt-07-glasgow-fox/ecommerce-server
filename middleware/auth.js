const { User, Product } = require('../models')
const { verifyJWT } = require('../helper/jwt')

async function authenticate (req, res, next) {
    try {
        const decode = verifyJWT(req.headers.access_token)
        const data = await User.findOne({
            where: { id: decode.id}
        })
        if (!data) {
            res.status(400).json({
                msg: 'Please login'
            })
        } else { 
            req.user = data
            next()
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = { authenticate }