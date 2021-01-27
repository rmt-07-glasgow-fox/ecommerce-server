const { Product } = require('../models')

module.exports = async (req, res, next) => {
    const id = req.params.id

    try {
        const product = await Product.findOne({
            where: {
                id
            }
        })

        if (!product) {
            throw {
                status: 404,
                message: `Error Not Found`
            }
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}