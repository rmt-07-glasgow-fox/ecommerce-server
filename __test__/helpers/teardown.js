const clearProducts = require('./clear-products')
const models = require('../../models')

module.exports =  async function () {
  await clearProducts()
  models.sequelize.close()
};
