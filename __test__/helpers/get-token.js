const { User } = require('../../models')

async function getToken() {
    if (process.env.NODE_ENV === 'test') {
        return await User.findOne({
            where: {
                email: 'admin@mail.com'
            }
        })
    }
}

module.exports = getToken