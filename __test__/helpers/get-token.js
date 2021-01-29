const { User } = require('../../models')

 function getToken() {
    if (process.env.NODE_ENV === 'test') {
        return User.findOne({
            where: {
                email: 'admin@mail.com'
            }
        })
    }
}

module.exports = getToken