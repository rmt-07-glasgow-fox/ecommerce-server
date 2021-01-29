const errHandlers = require('./errHandlers');
const {authentication, authorization, authorizationCart} = require('./authMiddle')

module.exports = {
    errHandlers,
    authentication,
    authorization,
    authorizationCart
}