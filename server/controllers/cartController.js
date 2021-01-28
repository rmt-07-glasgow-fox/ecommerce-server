const { Cart } = require('../models')

class CartController {
    static listCart (req, res, next) {
        const UserId = req.user.id
        Cart.findAll({ where: { UserId }, include: ['Product'] })
            .then(result => {
                const payload = result.map(el => {
                    return {
                        id: el.id,
                        quantity: el.quantity,
                        status: el.status,
                        UserId: el.UserId,
                        Product: {
                            id: el.Product.id,
                            name: el.Product.name,
                            image: el.Product.image_url,
                            price: el.Product.price,
                            stock: el.Product.stock
                        }
                    }
                })
                res.status(200).json(payload)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
    static addToCart (req, res, next) {
        const ProductId = req.body.id
        const UserId = req.user.id
        let stockProduct = 0
        Cart.findOne({ where: { ProductId, UserId }, include: ['Product'] })
            .then(result => {
                if (result) {
                    stockProduct = result.Product.stock
                    if (stockProduct >= result.quantity + 1) {
                        const quantity = result.quantity + 1

                        return Cart.update({ quantity }, { where: { ProductId, UserId } })
                    } else {
                        throw { name: "OutOfStock" }
                    }
                } else {
                    const quantity = 1 
                    const status = true
                    return Cart.create({ quantity, status, UserId, ProductId })
                }
            })
            .then (result => {
                console.log(result, 'result line 50')
                if (result) {
                    return Cart.findOne({ where: { ProductId, UserId }, include: ['Product'] })
                }
                if (result[0] === 1) {
                    return Cart.findOne({ where: { ProductId, UserId }, include: ['Product'] })
                }  else {
                    throw { name: "OutOfStock" }
                }
            })
            .then (result => {
                if (result) {
                    const payload = {
                        cartId: result.id,
                        quantity: result.quantity,
                        stockProduct: result.Product.stock,
                        productPrice: result.Product.price
                    }
                    res.status(201).json(payload)
                }
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
    static changeCart (req, res, next) {
        const id = +req.params.id
        const UserId = req.user.id
        const { quantity } = req.body

        Cart.findOne({ where: { ProductId: id, UserId }, include: ['Product'] })
            .then(result => {
                if (!result) {
                    next({ name: 'ResourceNotFound' })
                } else {
                    const stock = result.Product.stock
                    if (stock >= quantity) {
                        return Cart.update({ quantity }, {
                            where: { ProductId: id, UserId },
                            fields: ['quantity']
                        })
                    } else {
                        next ({ name: 'OutOfStock' })
                    }
                }
            })
            .then(result => {
                if (result[0] === 1) {
                    res.status(201).json({ message: 'Success in Updating Cart' })
                } else {
                    next({ name: 'ResourceNotFound' })
                }
            })
            .catch(err => { next(err) })
        
    }
    static removeCart (req, res, next) {
        const id = +req.params.id
        const UserId = req.user.id

        Cart.destroy({ where: { ProductId: id, UserId } })
            .then(result => {
                console.log(result)
                if (result === 1) {
                    res.status(200).json({ message: "Successfully Delete The Cart" })
                } else {
                    next({ name: "ResourceNotFound" })
                }
            })
            .catch(err => { next(err) })
    }
}

module.exports = CartController