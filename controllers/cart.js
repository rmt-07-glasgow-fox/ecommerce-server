const {Cart, CartList, Product} = require('../models/index')
const {sequelize} = require('../models/index')

class CartCon {
    static findUnpaid (req, res, next) {
        Cart.findOne({
            where: {
                UserId: req.loginUser.id,
                status: 'UNPAID'
            },
            include: Product
        })
        .then(data => {
            if (data) {
                res.status(200).json(data.Products)
            } else (
                res.status(200).json([])
            )
        })
        .catch(err => {
            next(err)
        })
    }

    static async addToCart (req, res, next) {
        let currentStock = 0
        let cart = {
            UserId: req.loginUser.id,
            ProductId: req.params.id,
            qty: req.body.qty,
            currentPrice: req.body.currentPrice,
            status: 'UNPAID'
        }
        await Product.findOne({where: {id: cart.ProductId}})
        .then(data => {
            if (data) {
                currentStock = +data.stock
            } else {
                currentStock = 0
            }
            
        })
        .catch(err => {
            next(err)
        })

        //find cart unpaid
        Cart.findOne({
            where: {
                UserId: cart.UserId,
                status: cart.status
          }
        })
        .then(data => {
            //if cart unpaid. find product
            if (data) {
                // find product in cart list
                cart.CartId = data.id
                CartList.findOne({
                    where: {
                        CartId: cart.CartId,
                        ProductId: cart.ProductId
                    }
                })
                .then(data => {
                    // found product in cart list. update cart list
                    if (data) {
                        cart.currentPrice = +req.body.currentPrice
                        cart.qty = +cart.qty + data.qty

                        let stock = currentStock - cart.qty

                        if (stock >= 0) {
                            CartList.update(cart, {
                                where: {
                                    CartId: cart.CartId,
                                    ProductId: cart.ProductId
                                }
                            })
                            .then(data => {
                                res.status(200).json({message: 'Success update product in cart list.'})
                            })
                            .catch(err => {
                                next(err)
                            })
                        } else {
                            next({ name: 'InvalidStock' })
                        }
                        
                    // no product in cart list. create new cart list
                    } else {
                        // create new cart list
                        let stock = currentStock - cart.qty

                        if (stock >= 0) {
                            CartList.create(cart)
                            .then(data => {
                                res.status(200).json({message: 'Success create new cart list.'})
                            })
                            .catch(err => {
                                next(err)
                            })
                        } else {
                            next({ name: 'InvalidStock' })
                        }
                    }
                })
            // no unpaid cart. creat new cart and cart list
            } else {
                //create cart
                Cart.create(cart)
                .then(data => {
                    //create cart list
                    cart.CartId = data.id
                    CartList.create(cart)
                    .then(data => {
                        res.status(200).json({message: 'Success create new cart and cart list.'})
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
            next(err)
        })
    }

    static put (req, res, next) {
        let CartId = req.params.cartid
        let ProductId = req.params.id
        let cart = {
            qty: req.body.qty,
            currentPrice: req.body.currentPrice
        }

        CartList.update(cart, {
            where: {
                CartId, ProductId
            }
        })
        .then(data => {
            res.status(200).json({message: 'Success update product in cart list.'})
        })
        .catch(err => {
            next(err)
        })
    }

    static delete (req, res, next) {
        let ProductId = req.params.id
        let CartId = req.params.cartid
        // delete cart list
        CartList.destroy({where:{ ProductId, CartId }})
        .then(data => {
            res.status(200).json({message: 'Deleted.'})
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteCart (req, res, next) {
        let CartId = req.params.cartid

        Cart.destroy({where:{ id:CartId }})
        .then(data => {
            // delete cart
            return CartList.destroy({where: { CartId }})
        })
        .then(data => {
            // delete cart list
            res.status(200).json({message: 'Deleted.'})
        })
        .catch(err => {
            next(err)
        })
    }

    static async checkout (req, res, next) {
        let cart = {
            UserId: req.loginUser.id,
            ProductId: req.params.id,
            CartId: req.params.cartid 
        }

        const t = await sequelize.transaction()
        try {
            
            await CartList.findAll({ where: { CartId: req.params.cartid } })
            .then(cartlists => {
                cartlists.forEach(e => {
                    Product.findOne({ where: {id: e.ProductId } })
                    .then(product => {
                        Product.update({ stock: (+product.stock - +e.qty) }, { where: { id: e.ProductId } }, { transaction: t })
                    })
                });
            })

            await Cart.update({ status: 'PAID' },{ where: { id: cart.CartId } }, { transaction: t })
            res.send(200).json({ message: 'Checkout success.' })
            await t.commit() 

        } catch (err) {
            await t.rollback();
            next(err)
        }
    }
}

module.exports = CartCon