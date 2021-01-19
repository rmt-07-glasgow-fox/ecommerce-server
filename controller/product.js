const { Product } = require('../models')

class productController {
    static async readProduct (req, res) {
        try {
            const read = await Product.readAll()
            res.status(200).json(read)
        } catch (err) {
            next(err)
        }
    }
    static async createProduct (req, res) {
        const { name, image_url, price, stock } = req.body

        try {
            const input = await Product.create({
                name, image_url, price, stock
            })
            res.status(201).json(input)
        } catch (err) {
            next(err)
        }
    }
    static async update (req, res) {
        const id = req.params.id
        const { name, image_url, price, stock } = req.body
        try {
            const findId = await Product.findByPk(id)
            if (findId) {
                const update = await Product.update({
                    name,
                    image_url,
                    price,
                    stock
                }, {where: { id }})
                res.status(200).json(update)
            } else {
                next({
                    name: 'undefined' 
                })
            }
        } catch (err) {
            next(err)
        }
    }
    static async delete (req, res) {
        const id = req.params.id
        try {
            const data = await Product.destroy({where: { id }})
            res.status(200).json({
                msg: 'product was deleted'
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = productController