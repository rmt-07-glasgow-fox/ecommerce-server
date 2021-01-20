const { User } = require('../../models')

 function userDummy() {
    if (process.env.NODE_ENV === 'test') {
        return User.create({
            email: "customer@mail.com",
            password: "123456",
            role: "customer"
        })
    }
}

module.exports = userDummy