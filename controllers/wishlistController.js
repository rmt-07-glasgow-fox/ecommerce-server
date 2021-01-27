const {Wishlist, Product} = require('../models')

class WishlistController {
  static add(req,res,next) {
    const ProductId = req.params.ProductId
    Wishlist.findOne({
      where: {
        UserId: req.user.id,
        ProductId
      }
    })
      .then(data => {
        if(data) {
          throw {
            status: 400,
            message: 'This product is already on your wishlist'
          }
        } else {
          const obj = {
            UserId: req.user.id,
            ProductId
          }
          return Wishlist.create(obj)
        }
      })
      .then(data =>{
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static delete(req,res,next) {
    const id = Number(req.params.id);
    Wishlist.destroy({
      where: {
        id
      }
    })
    .then(data => {
      res.status(200).json({message: 'The product has been removed from your wishlist'})
    })
    .catch(err => {
      next(err)
    })
  }
  static getAll(req,res,next) {
    Wishlist.findAll({
      where: {
        UserId: req.user.id
      },
      order: [["createdAt","DESC"]],
      include: Product
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = WishlistController