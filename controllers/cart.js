const { Cart, Product, User } = require('../models/index')
const { sendReceipt } = require('../helper/nodemailer')

class cartController {
    static getCart(req, res, next) {
        Cart.findAll({
            where: {
                userId: +req.user.id,
            }
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
                    return Cart.update(obj, {
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
        // let obj = { isBought: req.body.isBought }
        let quantityToBuy = 0
        let stock = 0
        let productIdTarget = 0
        let userIdTarget = 0
        let sum = 0
        let productImage = ''
        let productName = ''

        Cart.findAll({
            where: {
                userId: req.user.id,
                isBought: false
            }
        })
        .then(cart => {
            if (cart[0]) {
                // mencari jumlah stock via productId
                quantityToBuy = cart[0].quantity
                userIdTarget = cart[0].userId
                productIdTarget = +cart[0].productId
                return Product.findAll({
                    where: {
                        id: productIdTarget
                    }
                })
            } else {
                throw { name: "ResourceNotFound" }
            }
        })
        .then(product => {
            productName = product[0].name
            productImage = product[0].image_url
            stock = product[0].stock
            console.log('pengecekan stock');
            // eksekusi pengecekkan
            if (stock === 0) {
                throw {
                    name: "Product is out of stock"
                } 
            } else if (quantityToBuy > stock) {
                throw {
                    name: "Product is not enough"
                }
            } else if (quantityToBuy <= stock) {
                console.log('eksekusi pengubahan stock');
                sum = stock - quantityToBuy
                let obj = { stock: sum }
                return Product.update(obj, {
                    where: {
                        id: productIdTarget
                    },
                    returning: true
                })
            }
        })
        .then(data => {
            console.log('masuk pengubahan stock')
            if (data[0]) {
                // pengubahan is bought
                let status = { isBought: true }
                return Cart.update(status, {
                    where: {
                        id: id,
                        userId: userIdTarget,
                        productId: productIdTarget,
                    }
                })
            } else {
                throw {
                    name: "ResourceNotFound"
                } 
            }
        })
        .then(() => {
            // send email here
            return User.findByPk(userIdTarget)
        })
        .then(user => {
            sendReceipt(user.dataValues.email, productImage, productName)
            console.log('success');
            res.status(200).json('CHECKOUT :)') // message checkout obj
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