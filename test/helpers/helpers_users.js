const { User, sequelize } = require('../../models')
const { queryInterface } = sequelize;

function clearUsers() {
    if (process.env.NODE_ENV === 'test') {
        return User.destroy({ where: {}})
    }
}

function registerUser() {
    if (process.env.NODE_ENV === 'test') {
        const obj = {
            email: 'tes5@mail.com',
            password: '123123',
            role: 'admin'
        }
        return User.create(obj)
    }
}

module.exports = { clearUsers, registerUser }