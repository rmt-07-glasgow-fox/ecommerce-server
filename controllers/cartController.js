const { User, Product, Cart } = require('../models/index')

class Controller {
    static addToCart (req, res, next) {
    const UserId = req.user.id
    const ProductId = req.body.ProductId
    const quantity = 1
    const status = false

    Cart.findOne({
      where: {
        UserId,
        ProductId
      }, include: [Product, User]
    })
      .then(data => {
        if(!data) {
          console.log(data, '<<< INI data dari then pertama')
          const newData = {
              UserId,
              ProductId,
              quantity,
              status
          }
          console.log(newData);
          return Cart.create(newData)
        } else {
          if(data.quantity < data.Product.stock) {
            console.log("<<< masuk ke update then ke dua");
            return Cart.update({
              quantity: data.quantity + 1
            }, {
              where: {
                UserId,
                ProductId
              }
            })
          }
        }
      })
      .then(data => {
          res.status(201).json({message: 'success add to cart'})
      })
      .catch(err => {
        next(err)
      })
    }

    static showCart (req, res, next) {
        Cart.findAll({
            where: {
                UserId: +req.user.id
            },
            include: [User, Product]
        })
        .then(data => {
            res.send(data)
        })
        .catch(err  => {
            res.send(err)
        })
    }

    static updateQuantity (req, res, next) {
        const id = +req.params.id;
        const ProductId = req.body.ProductId;
        const quantity = req.body.quantity;
        const UserId = +req.user.id

        Product.findByPk(ProductId)
        .then(data => {
            if (quantity > data.stock) {
                console.log('stock kurang');
            } else {
                return Cart.update({ quantity }, {where: { ProductId, UserId }, returning: true });
            }
        })
        .then((response) => {
            res.status(200).json(response);
        })
        .catch(err => {
            next(err)
        });
    }

    static deleteCart (req, res, next) {
        const ProductId = req.body.ProductId
        const UserId = req.user.id

        Cart.destroy({
          where: {
            UserId,
            ProductId
          }
        })
        .then(data => {
          res.status(200).json({message: 'success'})
        })
        .catch(err => {
          next(err)
        })
    }
}

module.exports = Controller