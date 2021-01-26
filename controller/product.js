const { verifyJWT } = require('../helper/jwt')
const { Product } = require('../models')

class productController {
    static async readProduct (req, res, next) {
        try {
            const read = await Product.findAll()
            res.status(200).json(read)
            // console.log(read)
        } catch (err) {
            next(err)
        }
    }
    static async getId (req, res, next) {
        try {
            const read = await Product.findOne({
                where: { id:req.params.id}
            })
            res.status(200).json(read)
        } catch (err) {
            next(err)
        }
    } 
    static async createProduct (req, res, next) {
        const { name, image_url, price, stock } = req.body
        const UserId = +req.user.id
        try {
            const input = await Product.create({
                name, image_url, price, stock, UserId
            })
            res.status(201).json(input)
        } catch (err) {
            next(err)
        }
    }
    static async update (req, res, next) {
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
                const updateData = {
                    id,
                    name,
                    image_url,
                    price,
                    stock
                }
                res.status(200).json(updateData)
            } else {
                next({
                    name: 'undefined' 
                })
            }
        } catch (err) {
            next(err)
        }
    }
    static async delete (req, res, next) {
        const id = req.params.id
        try {
            const data = await Product.destroy({where: { id }})
            res.status(200).json({
                msg: 'product was deleted'
            })
        } catch (err) {
            next(err)
            console.log(err)
        }
    }
}

module.exports = productController