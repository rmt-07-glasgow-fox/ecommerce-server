const { Wishlist, Product } = require('../models')

class WishlistController {
  static findByCust(req, res, next) {
    console.log('ok');
    const UserId = req.UserData.id
    Wishlist.findAll({
      where: { UserId },
      attributes: ['id'],
      include: [
        {
          model: Product,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ]
    })
    .then(data => res.status(200).json(data))
    .catch(next)
  }

  static create(req, res, next) {
    const { ProductId } = req.body
    const UserId = req.UserData.id
    Wishlist.findOne({
      where: { ProductId }
    })
      .then(data => {
        return data ?
          next({ name: 'CustomError', statusCode: 400, message: 'Already add to wishlist' }) :
          Wishlist.create({ ProductId, UserId })
      })
      .then(data => {
        return Wishlist.findOne({
          where: { id: data.id },
          attributes: ['id'],
          include: [
            {
              model: Product,
              attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
          ]
        })
      })
      .then(data => res.status(200).json(data) )
      .catch(next)
  }

  static delete(req, res, next) {
    Wishlist
      .destroy({ where: { id: +req.params.id }, returning: true })
      .then(data => {
        data ?
          res.status(200).json({ message: 'Wishlist success deleted!' }) :
          next({ name: 'NotFoundError' })
      })
      .catch(next)
  }
}

module.exports = WishlistController