const { Transaction } = require('../models')


class TransactionController {
    static async fetchTransaction (req, res, next) {
        try {
            const data = await Transaction.findAll(
                {   where : {UserId : req.userLogin.id},
                    attributes : {exclude : ['createdAt', 'updatedAt']}}
            )

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
    
    static async addTransaction (req,res, next) {
        let newTransaction = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock,
            UserId : req.userLogin.id
        }
        try {
            const data  = await Transaction.create(newTransaction)

            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }
}


module.exports = TransactionController