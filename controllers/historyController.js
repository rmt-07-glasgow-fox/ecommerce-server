const { History, Product, Cart } = require('../models')

class HistoryController {
    static addHistory (req,res,next) {
        let id = []
        let obj = []
        for (let i = 0; i < req.body.length; i++) {
            obj.push({
                UserId: req.loggedInUser.id,
                ProductId: req.body[i].ProductId,
                total: req.body[i].total
            })
            id.push(req.body[i].allCartId)
        }
        Cart.destroy({where: {id: id}})
            .then(data => {
                if (data) {
                    return History.bulkCreate(obj)
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