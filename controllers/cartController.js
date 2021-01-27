const { Cart } = require('../models')
const { Op } = require("sequelize");
const { Product } = require('../models')

class CartController {
    static addCart (req, res, next) {
        const obj = {
            UserId: req.loggedInUser.id,
            ProductId: req.body.ProductId,
            total: 1
        }
        Cart.findOne({
            where: {
                [Op.and]: [
                    { UserId: req.loggedInUser.id },
                    { ProductId: req.body.ProductId }
                ]
            }
        })
        .then(data => {
            if(!data) {
                return Cart.create(obj)
                .then(data2 => {
                    res.status(201).json(data2)
                })
                .catch(error => {
                    next(error)
                })
            } else {
                const updateCart = {
                    UserId: data.UserId,
                    ProductId: data.ProductId,
                    total: data.total + 1
                }
                return Cart.update(updateCart,{where: {UserId: data.UserId}})
                .then(data3 => {
                    res.status(201).json(data3)
                })
                .catch(error => {
                    next(error)
                })
            }
        })
        .catch(error => {
            next(error)
        })
    }
    
    static fetchCart (req,res,next) {
        Cart.findAll({where: {UserId: req.loggedInUser.id}, include: Product})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            next(error)
        })
    }

    static deleteCart (req,res,next) {
        Cart.destroy({
            where: {
                [Op.and]: [
                    { UserId: req.loggedInUser.id },
                    { ProductId: req.body.ProductId }
                ]
            }
        })
        .then(data => {
            if (data) {
                res.status(200).json({message: 'cart deleted'})
            } else {
                throw {
                    status: 404, 
                    message: 'cart not found'
                }
            }
        })
        .catch(error => {
            next(error)
        })
    }
}

module.exports = CartController