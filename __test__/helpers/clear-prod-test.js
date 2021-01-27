const { Product } = require('../../models')


function stopSequelize() {
    if(process.env.NODE_ENV == 'test') {
        return models.sequelize.close()
    }
}


module.exports = stopSequelize