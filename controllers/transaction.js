const { Transaction, Product } = require('../models')

class TransactionController {
  static async getTransaction (req, res, next) {
    const UserId = req.loggedIn.id
    
    try {
      const transaction = await Transaction.findOne({
        where: {
          UserId,
          status: 'uncompleted'
        },
        include: [{
          model: Product
        }]
      })
      res.status(200).json({transaction})
    } catch (error) {
      next(error)
    }
  }

  static async history (req, res, next) {
    const UserId = req.loggedIn.id
    
    try {
      const transactions = await Transaction.findAll({
        where: {
          UserId,
          status: 'completed'
        },
        order: [['updatedAt', 'desc']]
      })
      res.status(200).json({transactions})
    } catch (error) {
      next(error)
    }
  }

  static async deleteTransaction (req, res, next) {
    const id = req.params.id
    const UserId = req.loggedIn.id
    
    try {
      const transaction = await Transaction.destroy({
        where: {
          id
        }
      })

      const newtransaction = await Transaction.create({
        status: 'uncompleted',
        history: null,
        total: 0,
        UserId
      })
      res.status(200).json({message: `Cart has been cleared`})
    } catch (error) {
      next(error)
    }
  }

  static async checkout (req, res, next) {
    const id = req.params.id
    const UserId = req.loggedIn.id

    try {
      const transaction = await Transaction.findOne({
        where: {
          id
        },
        include: [{
          model: Product
        }]
      })
      
      if (transaction.Products.length === 0) {
        throw {
          status: 400,
          message: `Cannot Checkout Empty Cart`
        }
      } else {
        if (transaction.UserId != UserId) {
          throw {
            status: 403,
            message: `Cannot Checkout Others Cart`
          }
        } else {
          // change into history 
          let history = ''
          let total = 0
          let checkstock = transaction.Products.every(e => e.stock >= e.Cart.quantity) //  true / false

          if (!checkstock) {

            throw {
              status: 400,
              message: `Cannot Checkout If The Quantity is More Than Product(s) Stock`
            }

          } else {
            const array = transaction.Products.map((e , id) => {
              total += e.Cart.total
              const newStock = +e.stock - +e.Cart.quantity
              if (id === transaction.Products.length - 1) {
                history += `${e.id}/s${e.name}/s${e.Cart.quantity}/s${e.price}`
              } else {
                history += `${e.id}/s${e.name}/s${e.Cart.quantity}/s${e.price}\n`
              }

              return Product.update({
                stock: newStock
              }, {
                where: {
                  id: e.id
                },
                returning: true
              })
            })
      
            res.status(200).json({message: `Checkout Successfully`})
          }
        }
      }

    } catch (error) {
      next(error)
    }
  }
}

module.exports = TransactionController