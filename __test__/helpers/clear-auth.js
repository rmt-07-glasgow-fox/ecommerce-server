const { User } = require('../../models')

function clearAuth() {
  if(process.env.NODE_ENV === 'test') {
    return User.destroy({ where: {} })
  }
}

module.exports = clearAuth