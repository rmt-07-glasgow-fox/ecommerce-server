const { User } = require('../../models');

module.exports = () => {
    return User.create({
        name: 'Zahrani Alisha',
        email: 'zalisha@mail.com',
        password: '123456',
        role: 'customer'
    })
}