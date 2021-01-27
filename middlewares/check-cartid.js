const { Cart, Transaction } = require('../models')

module.exports = async (req, res, next) => {
    const id = req.params.id
    const UserId = req.loggedIn.id

    try {
        const cart = await Cart.findOne({
            where: {
                id
            },
            include: [{
              model: Transaction
            }]
        })
        if (!cart) {
            throw {
                status: 404,
                message: `Error Not Found`
            }
        } else {
          if (cart.Transaction.status == 'completed') {
            throw {
              status: 400,
              message: `Cannot Change Completed Transaction`
            }
          } else {
            if (UserId != cart.Transaction.UserId) {
              throw {
                status: 403,
                message: `Cannot Change Others Transaction`
              }
            } else {
              next()
            }
          }
        }
    } catch (error) {
        next(error)
    }
}