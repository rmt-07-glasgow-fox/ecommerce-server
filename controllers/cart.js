const { Cart, Product, User } = require('../models/index')
const { sendReceipt } = require('../helper/nodemailer')

class cartController {
   static getCart (req, res, next) {
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
        let obj = {
            userId: +req.user.id,
            productId: req.body.productId,
            isBought: false,
            quantity: +req.body.quantity
        }
        Cart.findAll({
            where: {
                userId: +req.user.id,
                productId: req.body.productId
            }
            })
            .then(data => {
                console.log(data);
                if (!data[0]) {
                    Cart.create(obj)
                    .then(data => res.status(201).json(data))
                    .catch(err => {
                        next(err)
                    })
                } else {
                    next({
                        name: "Item sudah di cart" 
                    })
                }
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }

    static checkout(req, res, next) {
        let id = +req.params.id
        let obj = { isBought: req.body.isBought }
        let quantityToBuy = 0
        let stock = 0
        let productIdTarget = 0
        let userIdTarget = 0
        let sum = 0
        let productImage = ''
        let productName = ''


        Cart.findAll({
            where: {
                id: id,
                isBought: false
            }
            })
            .then(cart => {
                if(cart[0]){
                    // mencari jumlah stock via productId
                    quantityToBuy = cart[0].quantity
                    userIdTarget = cart[0].userId
                    productIdTarget = +cart[0].productId
                    Product.findAll({
                        where: {
                            id: productIdTarget
                        }
                    })
                    .then(product => {
                        productName = product[0].name
                        productImage = product[0].image_url
                        stock = product[0].stock
                        console.log('pengecekan stock');
                        // eksekusi pengecekkan
                        if (stock === 0){
                            next({
                                name: "Product is out of stock" 
                            })
                        } else if (quantityToBuy > stock) {
                            next({
                                name: "Product is not enough" 
                            })
                        } else if (quantityToBuy <= stock) {
                            console.log('eksekusi pengubahan stock');
                            Cart.update(obj, {
                                where: {
                                    id : productIdTarget
                                },
                                returning: true
                            })
                            .then((data) => {
                                // change value stock
                                console.log('sum');
                                sum = stock - quantityToBuy
                                let obj = { stock: sum }
                                Product.update(obj, {
                                    where: {
                                        id: productIdTarget
                                    },
                                    returning: true
                                })
                                .then((data) => {
                                    console.log('masuk pengubahan stock')
                                    if(data[0]){
                                        // pengubahan is bought
                                    let status = { isBought: true }
                                    Cart.update(status,{
                                        where: {
                                            id: id,
                                            userId: userIdTarget,
                                            productId: productIdTarget,
                                        }
                                        })
                                        .then(() => {
                                            // send email here
                                            User.findByPk(userIdTarget)
                                            .then(user => {
                                                sendReceipt(user.dataValues.email, productImage, productName)
                                                console.log('success');
                                                res.status(200).json('CHECKOUT :)')
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                next(err)
                                            })
                                            
                                        })
                                        .catch(err => {
                                            console.log(err);

                                            next(err)
                                        })
                                    } else {
                                        next({
                                            name: "ResourceNotFound" 
                                        })
                                    }
                                })
                                .catch(err => {
                                    next(err)
                                })
                            })
                            .catch(err => {
                                next(err)
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        next(err)
                    })
                } else {
                    next({
                        name: "ResourceNotFound" 
                    })
                }
            })
            .catch(err => {
                console.log(err);
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
            if(data[0]){
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
            if(data === 1) {
                res.status(200).json(deleted)
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch(() =>  {
            next(err)
        })
    }
}

module.exports = cartController