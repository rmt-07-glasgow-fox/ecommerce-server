const { User } = require('../../models/')


const clearUsers = () => {
    if (process.env.NODE_ENV === 'test') {
        User.destroy({
            where: {}
        })
    }
}

module.exports = clearUsers
