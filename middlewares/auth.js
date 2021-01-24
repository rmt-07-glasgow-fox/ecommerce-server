const { checkToken } = require('../helpers/jwt')
const { User } = require('../models')

function authenticate(req, res, next) {

}

function authAdmin(req, res, next) {
    // console.log('masuk auth admin');
    if (req.headers.access_token) {
        let login = checkToken(req.headers.access_token)
        // console.log(login);
        User.findOne({
            where: {email: login.email}
        })
        .then(result => {
            if (!result) {
                next({name: 'NotFound', message: 'data not found'})
            } else {
                if (result.role !== 'admin') {
                    next({name: 'Forbidden', message: 'only admin can access'})
                } else {
                    req.user = login
                    next()
                }
            }
        })
        .catch(err => next(err))
    } else {
        next({name: 'NotLogin', message: 'please login first'})
    }
}

module.exports = {
    authAdmin
}