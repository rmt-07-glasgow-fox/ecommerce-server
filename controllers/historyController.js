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
        History.bulkCreate(obj)
        .then(data => {
            for (let i = 0; i < id.length; i++) {
                return Cart.destroy({where: {id: id[i]}})
                .then(data => {
                    if (data) {
                        res.status(200).json({message: 'cart deleted'})
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