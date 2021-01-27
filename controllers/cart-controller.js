const { User, Cart, Product, CartProduct } = require('../models')

class CartController {
      static addCart(req, res, next) {
            let { productid, cartid  } = req.params 
            let newCart = {
                  CartId: cartid,
                  ProductId: productid,
                  quantity: req.body.quantity
            }
            let cart = ''
            CartProduct.findOne({where: 
                  { 
                    ProductId: productid,
                    CartId: cartid 
                  }
            })
              .then(data => {
                    if(!data) return CartProduct.create(newCart)
                    cart = data
                    let quantity ={
                          quantity: data.quantity + 1
                    }
                    return CartProduct.update(quantity, {where: {
                              ProductId: productid,
                              CartId: cartid 
                    }})
              }).then(data => {
                    if (!cart) res.status(201).json(data)
                    res.status(200).json({ message: 'success update'})
              }).catch(err => {
                    res.status(500).json(err)
              })
      }

      static getCart(req, res, next) {
            let { cartid } = req.params
            CartProduct.findAll({where: {CartId: cartid}})
              .then(data => {
                  res.status(200).json(data)
              }).catch(err => {
                  res.status(500).json(err)
              })
      }

      static updateCart(req, res, next) {

            let { productid, cartid } = req.params
            let newQuantity = {
                  quantity: req.body.quantity
            }

            CartProduct.update(newQuantity, {where: {
                  ProductId: productid,
                  CartId: cartid
            }}).then(data => {
                  if (data !== 1) res.status(404).json({ message: 'not found'})
                  res.status(200).json({ message: 'success update'})
            }).catch(err => {
                  res.status(400).json(err)
            })
      }

      static removeCart(req, res, next) {
            let { productid, cartid } = req.params
            CartProduct.destroy({where: {
                  ProductId: productid,
                  CartId: cartid
            }}).then(data => {
                  if (data !== 1) res.status(404).json({ message: 'not found'})
                  res.status(200).json({ message: 'success delete'})
            }).catch(err => {
                  res.status(400).json(err)
            })
      }
}

module.exports = CartController