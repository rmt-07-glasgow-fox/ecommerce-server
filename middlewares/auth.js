const { checkToken } = require('../helpers/jwt')
const { User, Product, Cart } = require('../models')

function authUser(req, res, next) {
    console.log(req.headers);
    let { access_token } = req.headers
    console.log('hai');
    let login = checkToken(access_token)
    console.log(login);
    User.findOne({
        where: {email: login.email}
    })
    .then(data => {
        // console.log('masuk then',data);
        if (data) {
            req.user = login
            next()
        } else {
            console.log('imel ga ktemu');
            next({name: 'NotLogin', message: 'please login first'})
        }
    })
    .catch(next)
}

function authorizeUser(req, res, next) {
    console.log('author user');
    Cart.findByPk(req.params.id)
    .then(data => {
        if (!data) {
            next({name: 'NotFound', message: 'data not found'})
        } else {
            if (data.UserId === req.user.id) {
                console.log('masuk');
                next()
            } else {
                next({name: 'Unauthorized', message: 'not your own'})
            }
        }
    })
    .catch(next)
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
            console.log('auth');
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
    authAdmin,
    authUser,
    authorizeUser
}