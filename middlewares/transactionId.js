const { Transaction, Product } = require('../models')

module.exports = async (req, res, next) => {
  const UserId = req.loggedIn.id
  
  try {
    const transaction = await Transaction.findOne({
      where: {
        UserId,
        status: 'uncompleted'
      }
    })
    req.transaction = transaction.id
    next()
  } catch (error) {
    next(error)
  }
}