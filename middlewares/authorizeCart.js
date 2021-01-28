const { Cart } = require("../models")

async function authorizeCart(req, res, next) {
    try {
        let cart = await Cart.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!cart || cart.UserId !== req.user.id) {
            next({
                message: "this is not yours",
                code: 401
            })
        } else {
            next()
        }
    } catch (err) {
        next({
            message: err.message,
            code: 500
        })
    }
}



module.exports = {
    authorizeCart
}