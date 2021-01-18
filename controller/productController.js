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
            // UserId : req.loginUser.id
            UserId : req.loginUser.id,
        }

        try {
            const data = await Product.create(newProd)

            res.status(201).json({
                msg : 'data successfull create',
                name : data.name,
                image_url: data.image_url,
                price : data.price,
                stock : data.stock,
                UserId : data.UserId
            })
        } catch (err) {
            // console.log(err)
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
            const data = await Product.update(updating, {where : {id : prodId}})

            if(!data) {
                next({ name : 'notFound'})
            } else {
                res.status(201).json({
                    msg: `Task ${taskId} sucseccfull update`
                })
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
                    // id : data.id,
                    msg : `Product ${id} success to delete`
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ProductController