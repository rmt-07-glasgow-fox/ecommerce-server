const { Cart } = require('../models')

class CartController {
    static async fetchCart (req, res, next) {
        try {
            const data = await Cart.findAll({
                where: { UserId : req.userLogin.id },
                attributes : {exclude : ['createdAt', 'updatedAt']}})

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async addCart (req, res, next) {
        let newCart = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock,
            UserId : req.loginUser.id,
        }

        try {
            const data = await Cart.create(newCart)

            res.status(201).json(data)
        } catch (err) {

            next(err)
        }
    }

    static async updateStock(req, res, next) {

        let cartId = +req.params.id

        let updating = {
            stock : req.body.stock
        }

        try {
            const data = await Cart.update(updating, {
                where : {id : cartId},
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

    static async delCart(req, res, next) {
        let id = +req.params.id

        try {
            const data = await Cart.destroy({where :
                { id }
            })

            if(!data) {
                next({ name : 'notFound' })
            } else {
                res.status(200).json({
                    message : `Cart success to delete`
                })
            }
        } catch (err) {
            next(err)
        }
    }
}


module.exports = CartController