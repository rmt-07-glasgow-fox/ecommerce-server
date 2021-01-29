const { Cart, Product } = require('../models')


class CartController {
    static async getAll (req, res, next) {
      const userId = req.loggedInUser.id
      try {
        const cart = await Cart.findAll({where: {UserId: userId, status: 'unpaid'}, include: {model: Product}, attributes: ['id', 'UserId', 'ProductId', 'status', 'quantity']})
        let price = 0
        for(let i = 0; i < cart.length; i++){
          let temp;
          if(i < 1){
            temp = cart[i].Product.price * cart[i].quantity
            price = temp
          }
          else {
            temp = cart[i].Product.price * cart[i].quantity
            price = temp + price
          }
          console.log(temp)
        }
        console.log(price.toLocaleString('en-ID', {style: 'currency', currency: 'IDR'})        )
        res.status(200).json([cart, price])
      }
      catch (err){
        next(err)
      }
    }
    static async addCart (req, res, next) {
      console.log(req.loggedInUser)
      const payload = {
        UserId: req.loggedInUser.id,
        ProductId: req.body.ProductId,
        quantity: 1,
        status: 'unpaid'
      }
      try{
        const cart = await Cart.findOne({where: {UserId: req.loggedInUser.id, ProductId: req.body.ProductId, status: 'unpaid'}})
        if(!cart){
          const addCart = await Cart.create(payload, {returning: true})  
          res.status(201).json(addCart)
        }
        else {
          const updateQuantity = await Cart.update({
            quantity: payload.quantity += 1,
          },{where: {id: payload.ProductId}})
          res.status(200).json('berhasil update')
        }
      }
      catch(err) {
        next(err)
      }
    }
    
    static async updateCart (req, res, next) {
      const id = req.params.id
      const newQuantity = req.body.quantity
      console.log(id, "<<<< id params")
      try {
        const cart = await Cart.findOne({where: {id}, include: {model: Product}})
        if(cart.Product.stock < cart.quantity){
          throw {
            msg: 'stock not avaliable',
            status: 400
          }
        }
        else if(cart.Product.stock >= newQuantity && newQuantity > 0){
          console.log('masuk else if')
          const editQuantity = await Cart.update({quantity: req.body.quantity }, {where: {id} })
          console.log(editQuantity)
          res.status(200).json(editQuantity) 
        }
        else{
          throw {
            msg: 'Cart not found',
            status: 404
          }
        }
      }
      catch (err) {
        next(err)
      }
    }
    static async deleteCart (req, res, next) {
      const id = req.params.id
      try{
        const cart = await Cart.destroy({where: {id}})
        res.status(200).json(cart)
      }
      catch (err) {
        next(err)
      }
    }
}

module.exports = CartController;