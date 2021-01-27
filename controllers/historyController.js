const { History } = require('../models')

class HistoryController {
    static addHistory (req,res,next) {
        const obj = {
            UserId: req.loggedInUser.id,
            ProductId: req.body.ProductId,
            total: req.body.total
        }
        History.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            next(error)
        })
    }

    static fetchHistory (req,res,next) {
        History.findAll({where: {UserId: req.loggedInUser.id}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            next(error)
        })
    }
}

module.exports = HistoryController