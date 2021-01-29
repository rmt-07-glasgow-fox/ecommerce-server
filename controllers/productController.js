const { Product } = require('../models')

class ProductController{
    static async create(req, res){
        try {
            const opt = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock
            }

            const result = await Product.create(opt)

            if(result) return res.status(201).json(result)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async read(req, res){
        try {
            const result = await Product.findAll()

            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async edit(req, res){
        try {
            const id = +req.params.id

            const result = await Product.findOne({
                where: {
                    id
                }
            })

            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async update(req, res){
        try {
            const id = +req.params.id
            const opt = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock
            }

            const result = await Product.update(opt, {
                where: {
                    id
                },
                returning: true
            })

            return res.status(201).json(result)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async delete(req, res){
        try {
            const id = +req.params.id

            const result = await Product.destroy({
                where: {
                    id
                }
            })

            if(!result){
                return res.status(404).json({message: 'error not found'})
            }

            return res.status(200).json({message: 'product success to delete'})
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = ProductController