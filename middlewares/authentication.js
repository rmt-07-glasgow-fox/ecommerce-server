const { checkToken } = require('../helpers/jwt');
const { User } = require('../models');

function authentication(req, res, next) {
    const decoded = checkToken(req.headers.access_token);
    const email = decoded.email;
    User.findOne({ where: { email } })
    .then(user => {
        if (user) {
            req.headers.user = {
                id: user.id,
                email: user.email
            };
            next();
        } else {
            throw { msg: "Please login / register first"};
        }
    })
    .catch(err => {
        res.status(403).json(err);
    });
}

module.exports = authentication;