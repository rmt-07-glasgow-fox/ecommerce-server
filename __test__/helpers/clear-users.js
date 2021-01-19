const {User} = require('../../models')

exports.clearUsers = () => {
  console.log('helpers');
  if (process.env.NODE_ENV === 'test') {
    return User.destroy({where: {}})
  }
}