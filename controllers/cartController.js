const { Cart, Product } = require('../models')

class CartController {
    static showCart (req, res, next) {
        Cart.findAll({
            where: { UserId: req.UserId },
            include: [ Product ]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static addCart (req, res, next) {
        //userid, productid, quantity, status
        //cek stock productnya cukup ga
        //cek barangnya sama atau ga
        let ProductId = +req.body.ProductId
        let quantity = +req.body.quantity
        let UserId = +req.UserId
        let cartId
        Product.findOne({ 
            where: { id: ProductId }
        })
            .then(data => {
                if (!data || data.stock < quantity) {
                    // ini apa ya
                    res.status(400).json({ message: `Sorry, we don't have enough stock` })
                } else {
                    return Cart.findAll({
                        where: { UserId },
                        include: [ Product ]
                    })
                }
            })
            .then(data => {
                // cek barangnya udh ada atau blm?
                // res.send(data)
                for (let i = 0; i < data.length; i++) {
                    if (data[i].ProductId === ProductId) {
                        //new quantity, update quantity waduh wkwk
                        cartId = data[i].id
                        let newQuantity = data[i].quantity + quantity
                        return Cart.update({ quantity: newQuantity }, { where: { id: cartId }, returning: true})
                    } 
                }
                return Cart.create({ UserId, ProductId, quantity }) 
            })
            .then(data => {
                // kalo hasilnya 1 berhasil ke update, kalo hasilnya object berhasil bikin baru
                if (Array.isArray(data)) {
                    res.status(200).json(data[1])
                } else {
                    res.status(201).json(data)
                }
            })
            .catch(next)
    }

    static deleteCart (req, res, next) {
        let id = +req.params.id
        Cart.destroy({
            where: { id }
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
                    res.status(400).json({ message: `Sorry, we don't have enough stock` })
                } else {
                    return Cart.update({ quantity }, { where: { id }, returning: true}) 
                }
            })
            .then(data => {
                res.status(200).json(data[1])
            })
            .catch(next)
    }
}

module.exports = CartController