const errHandlers = require('./errHandlers');
const {authentication, authorization} = require('./authMiddle')

module.exports = {
    errHandlers,
    authentication,
    authorization
}