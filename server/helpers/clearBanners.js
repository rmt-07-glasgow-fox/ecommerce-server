const { Banner } = require('../models')

function clearBanner(){
  if(process.env.NODE_ENV == 'test'){
    return Banner.destroy({where:{}})
  }
}

module.exports = clearBanner