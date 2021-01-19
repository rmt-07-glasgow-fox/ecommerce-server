const { Product } = require('../models')

module.exports = class ControllerProduct {
    static async showProducts(req, res, next) {
        try {
            const data = await Product.findAll()
    
            return res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static addProduct(req, res, next) {
        const { name, image_url, price, stock } = req.body
        const newData = {
            name,
            image_url,
            price,
            stock,
            UserId: req.user
        }
        Product.create(newData)
        .then( data => {
            return res.status(201).json(data)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static async showProduct(req, res, next) {
        try {
            const getId = +req.params.id
            const found = await Product.findByPk(getId)

            if (!found) next({ name: "notFound" })
            else return res.status(200).json(found)
        } catch (err) {
            next(err)
        }
    }

    static editProduct(req, res, next) {
        const { name, image_url, price, stock } = req.body
        const newData = {
            name,
            image_url,
            price,
            stock
        }
        Product.update(newData)
        .then( data => {
            return res.status(200).json({ message: "Update success" })
        } )
        .catch( err => {
            next(err)
        } )
    }

    static async patchProduct(req, res, next) {
        try {
            const getId = +req.params.id
            const substract = req.body.stock
            const product = await Product.findByPk(getId)

            if (!product) next({ name: "notFound" })

            const newStock = product.stock - substract

            if (newStock < 0) next({ name: "notEnoughStock" })

            const patching = await Product.update(newStock, {
                where: {
                    id: getId
                }
            })

            if (!patching) next({ name: "notFound" })
            else return res.status(200).json({ message: "Success" })
        } catch (err) {
            next(err)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const getId = +req.params.id
            const hapus = await Product.destroy({
                where: {
                    id: getId
                }
            })

            if (!hapus) next({ message: "notFound" })
            else return res.status(200).json({ message: "Product has been deleted" })
        } catch (err) {
            next(err)
        }
    }
}