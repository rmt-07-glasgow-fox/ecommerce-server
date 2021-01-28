const { checkToken } = require('../helpers/jwt')
const { user } = require('../models')

class Auth {
    static authentication (req, res, next) {
        try {
            let decoded = checkToken(req.headers.access_token)
            user.findOne({where: {
                email: decoded.email
            }})
            .then( data => {
                let role = data.dataValues.role
                if(role !== 'admin'){
                    return res.status(401).json({message: 'You don\'t have an access'})
                } else {
                    if(!data) {
                        res.status(401).json({message: 'Please Login First'})
                    } else {
                        req.user = data
                        next()
                    }
                }
            })
            .catch( err => {
                res.status(500).json({message: err.message})
            })
        } 
        catch (err) { 
            res.status(401).json({message: 'Please Login First'})
        }
    }

    static authCustomer (req, res, next) {
        try {
            let decoded = checkToken(req.headers.access_token)
            user.findOne({where: {
                email: decoded.email
            }})
            .then( data => {
                let role = data.dataValues.role
                if(role !== 'customer'){
                    return res.status(401).json({message: 'You don\'t have an access'})
                } else {
                    if(!data) {
                        res.status(401).json({message: 'Please Login First'})
                    } else {
                        req.user = data
                        next()
                    }
                }
            })
            .catch( err => {
                res.status(500).json({message: err.message})
            })
        } 
        catch (err) { 
            res.status(401).json({message: 'Please Login First'})
        }
    }
}

module.exports = Auth