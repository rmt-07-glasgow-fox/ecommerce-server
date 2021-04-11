const { Cart, Product } = require('../models')

class CartController {
    static showCart (req, res, next) {
        Cart.findAll({
            where: { UserId: req.UserId, status: 'In Cart' },
            include: [ Product ],
            order: [
                ['updatedAt', 'DESC']
            ]
        })
            .then(data => {
                // res.send(data)
                res.status(200).json(data)
            })
            .catch(next)
    }

    static addCart (req, res, next) {
        //userid, productid, quantity, status
        //cek stock productnya cukup ga
        //cek barangnya sama atau ga
        let ProductId = +req.body.ProductId
        // let quantity = +req.body.quantity
        let UserId = +req.UserId
        // let cartId
        Product.findOne({ 
            where: { id: ProductId }
        })
            .then(data => {
                if (!data || data.stock < 1) {
                    // ini apa ya
                   throw({ name: 'Out of Stock' })
                } else {
                    // console.log(data)
                    return Cart.findOne({
                        where: { UserId, ProductId, status: 'In Cart' },
                        include: [ Product ]
                    })
                }
            })
            .then(data => {
                // res.send(data)
                if (data) {
                    return Cart.increment({ quantity: 1}, { where: { id: data.id }, returning: true})
                } else {
                    return Cart.create({ UserId, ProductId, quantity: 1 }) 

                }
            })
            .then(data => {
                // kalo hasilnya 1 berhasil ke update, kalo hasilnya object berhasil bikin baru
                // res.send(data)
                if (Array.isArray(data)) {
                    res.status(200).json({ message: 'Cart has been updated'})
                } else {
                    res.status(201).json(data)
                }
            })
            .catch(next)
    }

    static deleteCart (req, res, next) {
        let id = +req.params.id
        Cart.destroy({
            where: { id, status: 'In Cart' }
        })
            .then(response => {
                if (response === 1) {
                    res.status(200).json({ message: 'Cart has been deleted'})
                } else {
                    next({ name: 'Not Found'})
                }
            })
            .catch(next)
    }

    static updateCart (req, res, next) {
        let ProductId = +req.body.ProductId
        let quantity = +req.body.quantity
        let id = +req.params.id
        Product.findOne({
            where: { id: ProductId }
        })
            .then(data => {
                if (!data || data.stock < quantity) {
                    throw ({ name: `Out of Stock` })
                } else {
                    return Cart.update({ quantity }, { where: { id, status: 'In Cart' }, returning: true}) 
                }
            })
            .then(data => {
                res.status(200).json(data[1])
            })
            .catch(next)
    }
}

module.exports = CartController