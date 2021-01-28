const { Wishlist, Content } = require('../models')

class Controller {
  static getWishlist(req, res, next){
    console.log(req.user.id, 'masukGETWISH')
    Wishlist.findAll({
      include: [Content],
      attributes: ['id', 'ContentId','UserId','status','createdAt','updatedAt'],
      where: {
        UserId: +req.user.id,
      }, 
      order: [['updatedAt']]
    })
    .then(wishlist => {
      res.status(200).json(wishlist)
    })
    .catch(err => {
      console.log(err.stack, 'whyy')
      next(err)
    })
  }

  static postWishlist(req, res, next) {
    console.log('kita masuk wish post')
    Wishlist.findOne({
      attributes: ['id','UserId','ContentId', 'status', 'createdAt','updatedAt'],
      where: {
        ContentId:+req.body.ContentId,
        UserId: req.user.id
      }
    })
    .then(wish => {
      console.log(wish, 'ini dia')
      if(!wish){
        return Wishlist.create({
          status: true,
          ContentId:+req.body.ContentId, 
          UserId: req.user.id, 
        })
        .then(wishCreated => {
          res.status(201).json(wishCreated)
        })
        .catch(err => {
          console.log(err.stack, 'ini dia error')
          next(err)
        })
      } else {
        return Wishlist.destroy({
          where: {
            id: +wish.id
          } 
        })
        .then(wishDeleted => {
          res.status(201).json({message: 'Wishlist is deleted'})
        })
        .catch(err => {
          console.log(err.stack, 'ini dia error')
          next(err)
        })
      }
    })
  }

  static deleteWishlist(req, res, next) {
    console.log('delete')
    Wishlist.destroy({
      where: {
        id: +req.params.id
      }
    })
    .then(deletedWish => {
      res.status(200).json({message: 'Wish isDeleted'})
    })
    .catch(err => {
      console.log(err.stack)
    })
  }
}

module.exports = Controller