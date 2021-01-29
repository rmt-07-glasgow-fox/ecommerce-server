const {Cart, Product} = require('../models/index')
class HistoryCon {
    static findAll (req, res, next) {
        const UserId = req.loginUser.id
        const status = 'PAID'

        Cart.findAll({where: {UserId,status}, include: Product})
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                next({name: 'notFound'})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = HistoryCon