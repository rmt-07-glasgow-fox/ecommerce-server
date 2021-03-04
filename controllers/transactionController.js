const { Product, Cart, Transaction, sequelize } = require('../models')

class TransactionController {
    static async createTransaction (req, res, next) {   
        let transaction
        transaction = await sequelize.transaction();
        try {
            let data = await Cart.findAll({where: { UserId: req.UserId, status: 'In Cart' }, include: [Product]});
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    try {
                        // transaction = await sequelize.transaction();
                        let product = await Product.findByPk(data[i].ProductId)
                        if (product.stock - data[i].quantity < 0) {
                            // console.log('masuk')
                            throw({ name: 'Out of Stock'})
                        }

                        await Product.update({ stock: product.stock - data[i].quantity }, { where: { id: data[i].ProductId }, transaction})
                        
                        await Cart.update({ status: 'Paid'}, { where: { ProductId: data[i].ProductId}, transaction})
    
                        let total_price = data[i].quantity * data[i].Product.price
                        let transactionObj = {
                            UserId: req.UserId, 
                            ProductId: data[i].ProductId,
                            total_price
                        }
                        
                        await Transaction.create(transactionObj, { transaction })
                        
                        
                    } catch (error) {
                        // Rollback transaction only if the transaction object is defined
                        // console.log(error, 'masuk sini')
                        if (transaction) await transaction.rollback();
                        next(error)
                    }
                }
                await transaction.commit()
                res.status(200).json({ message: 'Checkout Success'})
            } else {
                next({ name: 'Empty Cart'})
            }
        } catch (err) {
            // console.log(err, 'line 44')
            next(err)
        }
    }

    static showTransaction (req, res, next) {
        Transaction.findAll({
            where: { UserId: req.UserId },
            include: [ Product ],
            order: [
                ['updatedAt', 'DESC']
            ],
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = TransactionController