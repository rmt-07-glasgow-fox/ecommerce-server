const { Product } = require('../models')


class ProductController {
    static async fetchAll (req, res, next) {
        try {
            const data = await Product.findAll({attributes : {exclude : ['createdAt', 'updatedAt']}})

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async getProductId(req, res, next) {
        let id = +req.params.id
        try {
            const data  = await Product.findOne({where : {id}})

            res.status(200).json(data)
        } catch {
            next(err)
        }
    }

    static async addProduct (req, res, next) {
        let newProd = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock,
        }

        try {
            const data = await Product.create(newProd)

            res.status(201).json(data)
        } catch (err) {

            next(err)
        }
    }

    static async updateProd(req, res, next) {

        let prodId = +req.params.id

        let updating = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock
        }

        try {
            const data = await Product.update(updating, {
                where : {id : prodId},
                returning : true,
                plain :true
            
            })

            if(!data) {
                next({ name : 'notFound'})
            } else {
                res.status(200).json(data[1])
            }

        } catch(err) {
            next(err)
        }

    }

    static async delProduct(req, res, next) {
        let id = +req.params.id

        try {
            const data = await Product.destroy({where :
                { id }
            })

            if(!data) {
                next({ name : 'notFound' })
            } else {
                res.status(200).json({
                    message : `Product success to delete`
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ProductController