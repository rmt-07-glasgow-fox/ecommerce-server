const { User, Sequelize } = require('../../models')

function clearDummyUser() {
    if (process.env.NODE_ENV === 'test') {
        return User.destroy({
            where: Sequelize.and({
                email: "customer@mail.com",
                role: "customer"
            })
        })
    }
}

module.exports = clearDummyUser