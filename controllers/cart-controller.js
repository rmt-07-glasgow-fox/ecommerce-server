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
                          quantity: req.body.quantity
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

      static getCartProduct(req, res, next) {
            let { cartid } = req.params
            CartProduct.findAll({ where: { CartId: cartid }, include: [Product] }  )
              .then(data => {
                  res.status(200).json(data)
              }).catch(err => {
                  res.status(500).json(err)
              })
      }

      static updateCart(req, res, next) {

            let { productid, cartid } = req.params
            let newQuantity = {
                  quantity: +req.body.quantity
            }

            CartProduct.update(newQuantity, {where: {
                  ProductId: productid,
                  CartId: cartid
            }}).then(data => {
                  console.log(data);
                  if (data[0] === 0) {
                    res.status(404).json({ message: 'not found'})
                  } else {
                    res.status(200).json({ message: 'success update'})
                  }
                  // res.status(200).json(data)
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

      static readCart(req, res, next) {
            let { id } = req.user
            Cart.findOne({ where: { UserId: id } } )
              .then(data => {
                    res.status(200).json(data)
              }).catch(err => {
                  //   res.status(500).json(err)
                  console.log(err);
              })
      }
}

module.exports = CartController