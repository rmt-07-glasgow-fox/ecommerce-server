const { Banner } = require('../../models')

function clearBanners() {
  if(process.env.NODE_ENV === 'test') {
    return Banner.destroy({where: {}})
  }
}

module.exports = clearBanners 