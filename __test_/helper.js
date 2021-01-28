const { User } = require('../models')

function clearDb() {
    return User.destroy({
        where:{}
    })
}

module.exports = clearDb