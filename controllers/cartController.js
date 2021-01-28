const { User, Product, Cart } = require('../models')

class cartController {

    static addCart(req, res, next) {
        let cart = {
            ProductId: req.body.ProductId,
            UserId: req.user.id,
            amount: +1
        }
        let temp = null

        Product.findOne({
            where: {
                id: cart.ProductId
            }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: 'not found',
                        code: 400
                    })
                } else {
                    temp = data
                    return Cart.findOne({
                        where: {
                            ProductId: cart.ProductId,
                            UserId: cart.UserId
                        }
                    })
                }
            })
            .then(data => {
                if (!data) {
                    console.log(cart, 'inicart')
                    return Cart.create(cart)
                } else if (data.UserId == req.user.id) {
                    let amount = data.amount + 1
                    return Cart.update({ amount }, {
                        where: { ProductId: data.ProductId }
                    })
                }
            })
            .then(data => {
                res.status(201).json({ msg: 'added!!' })
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500
                })
            })
    }

    static getCart(req, res, next) {
        let cart = []
        Cart.findAll({ include: Product }, { order: ['id', 'DESC']})
            .then(data => {
                data.forEach(element => {
                    if (element.UserId == req.user.id) {
                        cart.push(element)
                    }
                });
                res.status(200).json({ cart })
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500
                })
            })
    }

    static delCart(req, res, next) {
        Cart.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: "data not found",
                        code: 400,
                    })
                } else {
                    res.status(200).json({ message: "Cart success to delete" })
                }
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500
                })
            })
    }

    static updateCart(req, res, next) {
        let amount = req.body.amount
        Cart.update({ amount }, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: "data not found",
                        code: 404,
                    })
                } else {
                    res.status(200).json({ message: "data updated!" })
                }
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500
                })
            })
    }

}

module.exports = cartController