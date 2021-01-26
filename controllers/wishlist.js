const { Cart, User, Wishlist, Product } = require('../models/index')

class wishlistController {
   static getWishlist (req, res, next) {
    Wishlist.findAll({
        where: {
            userId: +req.user.id,
        }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
   }

   static insert(req, res, next) {
    let obj = {
        userId: +req.user.id,
        productId: req.body.productId,
    }
    Wishlist.findAll({
        where: {
            userId: +req.user.id,
            productId: req.body.productId
        }
        })
        .then(data => {
            if (!data[0]) {
                Wishlist.create(obj)
                .then(data => res.status(201).json(data))
                .catch(err => {
                    next(err)
                })
            } else {
                next({
                    name: "Item sudah di wishlist" 
                })
            }
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static delete(req, res, next) {
        let id = +req.params.id
        let deleted = {
            name: 'Wishlist Deleted' 
        }
        Wishlist.destroy({
            where: {
                id
            }
        })
        .then((data) => {
            if(data === 1) {
                res.status(200).json(deleted)
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch(() =>  {
            next(err)
        })
    }
}

module.exports = wishlistController