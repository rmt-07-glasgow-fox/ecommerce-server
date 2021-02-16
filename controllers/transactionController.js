const { Transaction } = require('../models')

class TransactionController {
  static findByCust(req, res, next) {
    Transaction
      .findAll({
        where: { UserId: req.UserData.id },
        attributes: { exclude: ['updatedAt'] }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = TransactionController