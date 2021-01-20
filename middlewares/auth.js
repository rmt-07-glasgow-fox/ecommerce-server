const { checkToken } = require('../helpers/jwt')
const { User, Product } = require('../models')

function authenticate(req, res, next) {
    try {
        let decoded = checkToken(req.headers.access_token)
        // console.log(decoded)
        User.findOne({
            where: {
                email: decoded.email
            }
        })
        .then(find => {
            if (!find) {
                res.status(401).json({ name: 'Please Login First'})
            } else {
                req.user = find
                next()
            }
        })
        .catch(err => {
            res.status(500).json({ name: 'Internal Server Error' })
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ name: err.message })
    }
}

function authorize(req, res, next) {
    Product.findByPk(+req.params.id)
    .then (data => {
        if (!data || req.user.role !== 'admin') {
            res.status(401).json({ message: 'Unauthorized'})
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json( {name: err.message })
    })
}

module.exports = { authenticate, authorize }