const { Wishlist } = require('../models')

class WishlistController {
    static async showWish(req, res, next) {
        try {
            const data  = await Wishlist.findAll(
                {   where: {UserId : req.userLogin.id},
                    attributes : {exclude : ['createdAt', 'updatedAt']}}
            )
            res.status(200).json(data)
                
        } catch(err) {
            next(err)
        }
    }


    static async addWish (req,res, next) {
        let newWish = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock,
            UserId : req.userLogin.id
        }

        try {
            const data = await Wishlist.create(newWish)

            res.status(201).json(data)
        } catch(err) {
            next(err)
        }
    }

    static async removeWish(req, res, next) {
        let id = +req.params.id

        try {
            const data = await Wishlist.destroy({where: {id}})

            if(!data) {
                next({name : 'notFound'})
            }
            res.status(200).json({
                message : `Wishlist success to delete`
            })
        } catch(err) {
            next(err)
        }
    }
}


module.exports = WishlistController