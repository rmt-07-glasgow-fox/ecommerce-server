const { User, Cart} = require('../models')

class CartController {
    static async get (req, res) {
      try {
        const result = await Cart.findAll({
            indclude: [User]
        })

        return res.status(200).json(result)
      } catch (error) {
        return res.status(500).json(error)
      }
    }

    static async updateStatus (req, res) {
      try {
        const id = +req.params.id

        const opt = {
          status: req.body.status
        }

        const result = await Cart.update(opt, {
            where: {
                id
            }
        })

        return res.status(201).json(result)
      } catch (error) {
        return res.status(500).json(error)
      }
    }
}

module.exports = CartController