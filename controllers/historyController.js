const { History, Product, Cart } = require('../models')

class HistoryController {
    static addHistory (req,res,next) {
        const id = req.body.allCartId
        Cart.destroy({where: {id: id}})
        .then(data => {
            if (data) {
                const obj = {
                    UserId: req.loggedInUser.id,
                    ProductId: req.body.ProductId,
                    total: req.body.total
                }
                return History.create(obj)
                .then(data => {
                    res.status(201).json(data)
                })
                .catch(error => {
                    next(error)
                })
            } else {
                throw {
                    status: 404, 
                    message: 'cart not found'
                }
            }
        })
        .catch(error => {
            next(error)
        })
    }

    static fetchHistory (req,res,next) {
        History.findAll({where: {UserId: req.loggedInUser.id}, include: Product})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            next(error)
        })
    }
}

module.exports = HistoryController