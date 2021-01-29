const { product, cart, sequelize } = require('../models')
const { checkToken } = require('../helpers/jwt')

class ProductController {
    static getall(req, res, next) {
        product.findAll({
            order: [['id', 'ASC']]
        })
            .then(dataProduct => {
                res.status(200).json(dataProduct)
            })
            .catch(err => {
                res.status(500).json({ message: 'Internal server error' })
            })
    }

    static create(req, res, next) {
        let newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }

        product.create(newProduct)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err);
                if (err.name === 'SequelizeValidationError') {
                    let errors = err.errors.map(err => err.message)
                    res.status(401).json(errors)
                } else {
                    res.status(500).json({ message: 'Internal server error' })
                }
            })
    }

    static update(req, res, next) {
        let id = +req.params.id
        let updateProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }
        product.update(updateProduct, {
            where: {
                id
            }
        })
            .then(data => {
                res.status(200).json({ message: 'Product is updated' })
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    let errors = err.errors.map(err => err.message)
                    res.status(401).json(errors)
                } else {
                    res.status(500).json({ message: 'Internal server error' })
                }
            })
    }

    static delete(req, res, next) {
        let id = +req.params.id
        product.destroy({
            where: {
                id
            }
        })
            .then(data => {
                res.status(200).json({ message: 'Product has been deleted' })
            })
            .catch(err => {
                res.status(500).json({ message: 'Internal server error' })
            })
    }

    static getAllCartUser(req, res, next) {
        let UserId = checkToken(req.headers.access_token).id

        cart.findAll({
            where: {
                UserId,
                status: 'unpaid'
            },
            attributes: ['id', 'UserId', 'ProductId', 'quantity', 'status'],
            include: [{
                model: product,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }],
            order: [['id', 'ASC']]
        })
            .then(cartData => {
                res.status(200).json(cartData)
            })
            .catch(err => {
                res.status(500).json({ message: 'Internal server error' })
            })
    }

    static addToCart(req, res, next) {
        let UserId = checkToken(req.headers.access_token).id
        let ProductId = +req.params.id
        let newCart

        cart.findOne({
            where: {
                ProductId: ProductId,
                UserId: UserId,
                status: 'unpaid'
            },
            include: 'product',
            attributes: ['id', 'UserId', 'ProductId', 'quantity']
        })
            .then(cartData => {
                if (!cartData) {
                    newCart = {
                        ProductId: ProductId,
                        UserId: UserId,
                        quantity: 1,
                        status: 'unpaid'
                    }
                    return cart.create(newCart)
                        .then(cartData => {
                            newCart = {
                                id: cartData.id,
                                UserId: cartData.UserId,
                                ProductId: cartData.ProductId,
                                quantity: cartData.quantity
                            }
                            res.status(201).json(newCart)
                        })
                } else {
                    if (cartData.quantity < cartData.product.stock && cartData.quantity >= 1) {
                        return cart.update({
                            quantity: sequelize.literal('quantity + 1')
                        },
                            {
                                where: {
                                    UserId: UserId,
                                    ProductId: ProductId,
                                    status: 'unpaid'
                                }
                            })
                            .then(cartData => {
                                res.status(200).json({ message: 'Quantity of product has been increased by 1' })
                            })
                            .catch(err => {
                                res.status(500).json({ message: 'Internal server error' })
                            })
                    }
                    else {
                        res.status(400).json({ message: 'Quantity can\'t more then stock' })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'Internal server error' })
            })
    }

    static minCart(req, res, next) {
        let UserId = checkToken(req.headers.access_token).id
        let ProductId = +req.params.id

        cart.update({
            quantity: sequelize.literal('quantity - 1')
        },
            {
                where: {
                    UserId: UserId,
                    ProductId: ProductId,
                    status: 'unpaid'
                }
            })
            .then(cartData => {
                if (cartData) {
                    return cart.findOne({
                        where: {
                            UserId: UserId,
                            ProductId: ProductId,
                            status: 'unpaid'
                        }
                    })
                        .then(cartData => {
                            if (cartData.quantity === 0) {
                                return cart.destroy({
                                    where: {
                                        UserId: UserId,
                                        ProductId: ProductId,
                                        status: 'unpaid',
                                        quantity: 0
                                    }
                                })
                                    .then(cartData => {
                                        res.status(200).json({ message: 'Product has been deleted from cart because quantity is 0' })
                                    })
                                    .catch(err => {
                                        res.status(500).json({ message: 'Internal server error' })
                                    })
                            } else {
                                res.status(200).json({ message: 'Quantity of product has been reduced by 1' })
                            }
                        })
                } else {
                    res.status(400).json({ message: 'Bad request' })
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'Internal server error' })
            })
    }

    static plusCart(req, res, next) {
        let UserId = checkToken(req.headers.access_token).id
        let ProductId = +req.params.id

        cart.findOne({
            where: {
                UserId,
                status: 'unpaid'
            },
            attributes: ['id', 'UserId', 'ProductId', 'quantity', 'status'],
            include: [{
                model: product,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }]
        })
            .then(cartData => {
                if (cartData.quantity < cartData.product.stock && cartData.quantity >= 1) {
                    return cart.update({
                        quantity: sequelize.literal('quantity + 1')
                    },
                        {
                            where: {
                                UserId: UserId,
                                ProductId: ProductId,
                                status: 'unpaid'
                            }
                        })
                        .then(cartData => {
                            res.status(200).json({ message: 'Quantity of product has been increased by 1' })
                        })
                        .catch(err => {
                            res.status(500).json({ message: 'Internal server error' })
                        })
                } else {
                    res.status(400).json({ message: 'Quantity can\'t more then stock' })
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'Internal server error' })
            })
    }

    static deleteCart(req, res, next) {
        let id = +req.params.id
        cart.destroy({ where: { id } })
            .then(cartData => {
                res.status(200).json({ message: 'Cart has been deleted' })
            })
            .catch(err => {
                res.status(500).json({ message: 'Internal server error' })
            })
    }

    static async checkout (req,res,next) {
        let UserId = checkToken(req.headers.access_token).id
        const t = await sequelize.transaction()
        try {
            const Cart = await cart.findAll({
                where: {
                    UserId, status: 'unpaid'
                }
            }, {
                transaction: t
            })
            for(const item of Cart) {
                const Product = await product.findByPk(item.ProductId)
                if (item.quantity > Product.stock) {
                    throw { msg: 'Tidak boleh lebih dari stok' }
                } else {
                    let stock = Product.stock - item.quantity
                    await product.update({stock}, {where: {id: item.ProductId}}, {transaction: t})
                    await cart.update({ status: 'paid' }, { where: { UserId, ProductId: item.ProductId, status: 'unpaid' } })
                }
            }
            t.afterCommit(_ => {
                return res.status(200).json({ msg: 'Success Paid Product' })
            })
            await t.commit()
        } catch (err) {
          await t.rollback()
          console.log(err);
          res.status(500).json({message: 'Internal server error'})
        }
    }

}

module.exports = ProductController