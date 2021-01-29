const {WishList, User, Product} = require('../models/index')

class WishListCon {

    static add (req, res, next) {
        let wishlist = {
            UserId: req.loginUser.id,
            ProductId: req.params.id,
        }
        WishList.create(wishlist)
        .then(data => {
            res.status(200).json({message: 'Success create new wish list.'})
        })
        .catch(err => {
            next(err)
        })
    }

    static delete (req, res, next) {
        let ProductId = req.params.id
        WishList.destroy({where: {ProductId}})
        .then(data => {
            res.status(200).json({message: 'Deleted.'})
        })
        .catch(err => {
            next(err)
        })
    }

    static findAll (req, res, next) {
        User.findOne({ where: { id: req.loginUser.id, }, include: Product })
        .then(data => {
            res.status(200).json(data.Products)
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = WishListCon