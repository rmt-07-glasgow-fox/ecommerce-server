const { Wishlist } = require('../models')

module.exports = async (req, res, next) => {
    const id = req.params.id

    try {
        const wishlist = await Wishlist.findOne({
            where: {
                id
            }
        })

        if (!wishlist) {
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