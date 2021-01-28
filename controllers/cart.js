const { Cart, Product, User } = require('../models/index')
const { sendReceipt } = require('../helper/nodemailer')

class cartController {
    static getCart(req, res, next) {
        Cart.findAll({
            where: {
                userId: +req.user.id,
            },
            attributes: ['id', 'userId', 'productId', 'quantity', 'isBought']
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }

    static insert(req, res, next) {
        let currentStock = 0
        let flag = false
        let obj = {
            userId: +req.user.id,
            productId: +req.body.productId,
            isBought: false,
            quantity: +req.body.quantity
        }

        Product.findByPk(obj.productId)
        .then(data => {
            currentStock = +data.stock
        })
        .catch(err => {
            next(err)
        })

        Cart.findAll({
            where: {
                userId: +req.user.id,
                productId: req.body.productId
            },
            attributes: ['id', 'userId', 'productId', 'quantity', 'isBought']
        })
        .then(data => {
            if (!data[0]) {
                return Cart.create(obj)
            } else {
                if (currentStock > obj.quantity) {
                    flag = true
                    return Cart.increment('quantity', {
                        where: {
                            id: data[0].dataValues.id
                        },
                        returning: true
                    })
                } else {
                    throw { name: "Can't be larger than stock" }
                }
            }
        })
        .then(data => {
            if (!flag) {
                res.status(200).json(data)
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            console.log(err);
            next(err)
        })


    }

    static checkout(req, res, next) {
        let obj = {
            isBought: true
        }
        console.log(+req.user.id);
        Cart.findAll({
            where: {
                userId: +req.user.id,
                isBought: false
            },
            attributes: ['id', 'productId', 'isBought','quantity']
        })
        .then(cart => {
            console.log(cart);
           return Promise.all(cart.map(data => Cart.update(obj, {
               where: {
                   id: data.dataValues.id
               },
               returning: true
            }))
        )})
        .then(value => {
            console.log(value);
            return User.findByPk(+req.user.id)
        })
        .then(user => {
            sendReceipt(user.dataValues.email)
            res.status(200).json({ message: 'Checkout Success'})
        })
        .catch(err => {
            next(err)
        })
    }

    static patchQuantity(req, res, next) {
        let id = +req.params.id
        let obj = { quantity: req.body.quantity }
        Cart.update(obj, {
            where: {
                id
            },
            returning: true
        })
            .then((data) => {
                if (data[0]) {
                    res.status(200).json(data[1])
                } else {
                    next({
                        name: "ResourceNotFound"
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        let id = +req.params.id
        let deleted = {
            name: 'Cart Deleted'
        }
        Cart.destroy({
            where: {
                id
            }
        })
            .then((data) => {
                if (data === 1) {
                    res.status(200).json(deleted)
                } else {
                    next({
                        name: "ResourceNotFound"
                    })
                }
            })
            .catch(() => {
                next(err)
            })
    }
}

module.exports = cartController