const { Cart, CartProduct, Product } = require('../models')

module.exports = class Controller {
    static async showAll(req, res, next) {
        try {
            const cart = await Cart.findOne({
                where: { UserId: req.user }
            })

            if (!cart) await Cart.create({ UserId: req.user })
            const data = await CartProduct.findAll({
                where: { CartId: cart.id }
            })
            return res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async addNew(req, res, next) {
        try {
            const cart = await Cart.findOne({
                where: { UserId: req.user }
            })
            if (!cart) await Cart.create({ UserId: req.user })

            const { ProductId, quantity } = req.body
            await CartProduct.create({
                CartId: cart.id,
                ProductId: ProductId,
                quantity: quantity
            })
            return res.status(200).json({ message: "Successfully added to your cart" })
        } catch (err) {
            next(err)
        }
    }

    static deleteCart(req, res, next) {
        CartProduct.destroy({
            where: { id: req.params.id }
        })
        .then( data => {
            if (!data) next({ name: "notFound" })
            else return res.status(200).json({ message: "Item has been removed" })
        } )
        .catch(err => next(err))
    }

    static editCart(req, res, next) {
        const newQuantity = {
            quantity: req.body.quantity
        }
        CartProduct.update(newQuantity, {
            where: { id: req.params.id }
        })
        .then( data => {
            if (!data) next({ name: "notFound" })
            else return res.status(200).json({ message: "Success" })
        } )
        .catch(err => next(err))
    }
}