const { Product } = require("../models")

async function authorize(req, res, next) {
    try {
        let product = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!product || product.UserId !== req.user.id) {
            next({
                message: "you are not admin",
                code: 401,
                from: 'function authorize'
            })
        } else {
            next()
        }
    } catch (err) {
        next({
            message: err.message,
            code: 500,
            from: 'function authorize'
        })
    }
}



module.exports = {
    authorize
}