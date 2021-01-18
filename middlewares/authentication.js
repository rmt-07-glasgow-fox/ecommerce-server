const { cekToken } = require('../helper/jwt')
const { User } = require('../models')

function authenticate(req, res, next) {
    try {
        let decoded = cekToken(req.headers.access_token)
        console.log(decoded);
        User.findOne({
            where:{
                email:decoded.email
            }
        })
        .then(find => {
            if (!find) {
                res.status(401).json({ message:'login first' })
            } else{
                req.user = find
                next()
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

module.exports = { authenticate }
