const { Cart, Product, User } = require('../models')


class CartController {

  static getAllCartHandler(req, res, next) {

    Cart.findAll({
      order: [[ 'id', 'ASC']],
      where: {
        UserId: req.user.id
      },
      include: [User, Product]
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  
  static postAllCartHandler(req, res, next) {

    const UserId = req.user.id
    const ProductId = req.body.ProductId
    const { quantity, status } = req.body
    const obj = {
      ProductId,
      quantity,
      status,
      UserId
    }

    Cart.findOne({
      where: {
        UserId,
        ProductId
      }, include: [Product, User]
    })
      .then(data => {
        if(!data) {
          console.log('masuk siniiiiiiiiiiiiiiiii')
          return Cart.create(obj)
        } else {
          if(data.quantity < data.Product.stock) {
            return Cart.update({
              quantity: data.quantity + 1
            }, {
              where: {
                UserId,
                ProductId
              }, returning: true
            })
          }
        }
      })
      .then(data => {
        if (Cart.quantity > 1) {
          return res.status(200).json(data[1])
        }
        
        return res.status(201).json(data)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static patchCartHandler (req, res, next) {

    const { ProductId, quantity } = req.body;

    Product.findByPk(ProductId)
      .then(data => {
        if (quantity > data.stock) {
          next({ name: "UnsifficientStock" });
        } else {
          return Cart.update(
            { quantity }, { where: { ProductId, UserId: req.user.id }, returning: true }
          );
        }
      })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }

  static deleteCartHandler(req, res, next) {

    const { ProductId } = req.body
    console.log(req.body)

    Cart.destroy({ 
      where: { 
        ProductId,
        UserId: req.user.id 
      }})
      .then(data => {
        res.status(200).json({ message: "Cart item successfully deleted" });
      })
      .catch(next);
  }
}

module.exports = CartController