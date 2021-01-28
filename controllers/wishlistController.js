const {Wishlist, Product, sequelize} = require("../models")
const {checkToken} = require('../helpers/jwt')

class wishlistController {
    static create(req, res, next) {
        const ProductId = req.body.ProductId
        const UserId = checkToken(req.headers.access_token).id
        Wishlist.findOne({
          include: 'Product', 
          attributes: ['id', 'UserId', 'ProductId'], 
          where: {ProductId, UserId}
        })
        .then(wishlist => {
          if (!wishlist) {
            return Wishlist.create({ProductId, UserId})
            .then(wishlist => {
              const {id, ProductId, UserId} = wishlist
              res.status(201).json({id, ProductId, UserId})
            })
          } else {
            res.status(200).json({message: 'wishlist has been added'})
          }
        })
        .catch(err => {
          next(err)
        })
    }

    static getWishlists(req, res, next) {
      const UserId = checkToken(req.headers.access_token).id
      Wishlist.findAll({
        include: 'Product', 
        attributes: ['id', 'UserId'], 
        where: {UserId}, order: [['createdAt', 'DESC']]
      })
      .then(wishlists => {
        const output = wishlists.map(el => {
          return { 
            id: el.id, 
            UserId: el.UserId,
            ProductId: el.ProductId,
            updatedAt: el.updatedAt,
            Product: el.Product
            }
        })
        res.status(200).json(output)
      })
      .catch(err => {
        next(err)})
    }

    static delete(req, res, next) {
      Wishlist.destroy({where: {id: +req.params.id}})
      .then(data => {
        res.status(200).json({message: 'delete wishlist successfull'})
      })
      .catch(err => next(err))
    }
}

module.exports = wishlistController