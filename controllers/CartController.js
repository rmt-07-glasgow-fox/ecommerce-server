const { Cart, Product } = require('../models')

class CartController {
    static create(req, res, next) {
        let obj = {
            ProductId: req.params.id,
            UserId: req.user.id,
            quantity: 1,
            status: 'not paid'
        }
        let qty

        Product.findOne({where: {id: req.params.id}})
        .then(findProduct => {
            qty = findProduct.quantity
            return Cart.findOne({where: {ProductId: req.params.id, UserId: req.user.id}})
        })
        .then(data => {
            console.log('hasil find>>>>>>>>>>>>>', data);
            if (data) {
                if (data.quantity < qty) {
                    return Cart.update({quantity: +(data.quantity) + 1}, {
                        where: {ProductId: req.params.id, UserId: req.user.id},
                        returning: true
                    })
                } else {
                    res.status(200).json(data)
                }
            } else {
                return Cart.create(obj)
            }
        })
        .then(data => {
            console.log('hasil return>>>>>>>>>>', data);
            if (data) {
                if (Array.isArray(data)) {
                    res.status(200).json(data[1][0])
                } else {
                    res.status(201).json(data)
                }
            } else {
                next({name: 'badRequest', message: 'bad request'})
            }
        })
        .catch(next)
    }

    static getUserCart(req, res, next) {
        Cart.findAll({where: {UserId: req.user.id},
            include: [Product]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static patchUserCart(req, res, next) {
        let { change, ProductId } = req.body
        let quantity

        Product.findByPk(+ProductId)
        .then(findProduct => {
            console.log(findProduct);
            quantity = findProduct.quantity
            return Cart.findOne({where: {id: req.params.id}})
        })
        .then(findCart => {
            console.log('find cart>>>>>>>>>>>>>>>>', findCart);
            if (change === '1' && findCart.quantity < quantity) {
                return Cart.update({quantity: +(findCart.quantity) + 1}, {
                    where: {id: req.params.id},
                    returning: true
                })
            } else if (change === '-1' && findCart.quantity > 0) {
                return Cart.update({quantity: +(findCart.quantity) - 1}, {
                    where: {id: req.params.id},
                    returning: true
                })
            }
        })
        .then(data => {
            console.log('hasil patch>>>>>>>>>>>>>>>>>>>', data);
            res.status(200).json(data[1][0])
        })
        .catch(next)
    }

    static deleteUserCart(req, res, next) {
        Cart.destroy({where: {id: +req.params.id}})
        .then(data => {
            console.log(data);
            if (data === 1) {
                res.status(200).json({message: 'success to delete item on cart'})
            } else {
                next({name: 'NotFound', message: 'data not found'})
            }
        })
        .catch(next)
    }
}

module.exports = CartController