const { cekToken } = require('../helpers/jwt')
const { Product, User, Cart } = require('../models')

class CartController {
    static getAllCart (req, res, next) {
        const tokenLoad = cekToken(req.headers.access_token)
        const UserId = tokenLoad.id
        Cart.findAll({include: [Product, User], where: {UserId}})
            .then(carts => {
                res.status(200).json(carts);
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }

    static createCart (req, res, next) {
        const UserId =  +req.user.id
        let ProductId = +req.body.ProductId
        let quantity = +req.body.quantity
        let stock
        Product.findOne({
            where: {
                id: ProductId
            }
        })
           .then(data => {
               console.log(data);
               if (!data) {
                   next({name: 'resourceNotFound'})
               } else {
                   stock = data.stock
                   return Cart.findOne({
                       where: {
                           UserId,
                           ProductId
                       }
                   })
               }
           })
           .then(data => {
               console.log(data);
               if (data) {
                   let newQti = data.quantity + quantity
                   if (stock >= newQti) {
                       let newData = {
                           ProductId,
                           UserId,
                           quantity: newQti
                       }
                       return Cart.update(newData, {
                           returning: true,
                           where: {
                               id: data.id
                           },
                       })
                   } else {
                       next({name: 'notEnoughStock'})
                   }
               } else {
                    if(stock >= quantity) {
                        let newData = {
                            ProductId,
                            UserId,
                            quantity
                        }
                        return Cart.create(newData)
                    } else {
                        next({name: 'notEnoughStock'})
                    }
              }
           })
           .then(data => {
               if(Array.isArray(data)) {
                   res.status(200).json(data[1][0]);
               } else {
                   res.status(201).json(data)
               }
           })
           .catch (err=> {
               console.log(err);
               next(err)
           })
    }

    static updateCarts (req, res, next) {
        let id = +req.params.id
        let quantity = +req.body.quantity
        Cart.findOne({include: [Product], where: {id}})
            .then(data => {
                if (data) {
                    let stock = data.Product.stock
                    let newQti = data.quantity + quantity
                    if (stock >= newQti) {
                        let newData = {
                            quantity: newQti
                        }
                        return Cart.update(newData, {
                            returning: true,
                            where: {
                                id
                            },
                        })
                    } else {
                        next({name: 'notEnoughStock'})
                    }
                } else {
                    next({name: 'resourceNotFound'})
                }
            })
            .then(data => {
                res.status(200).json(data[1][0]);
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }

    static deleteCart (req, res, next) {
        let id = +req.params.id
        Cart.destroy({
            where: {
                id
            }
        })
        .then(response => {
            res.status(200).json({
                message: "Success Delete Cart"
            });
        })
        .catch (err => {
            next(err)
        })
    }
}

module.exports = CartController