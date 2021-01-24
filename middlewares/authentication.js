const { checkToken } = require('../helpers/jwt');
const { User } = require('../models');

function authentication(req, res, next) {
    const decoded = checkToken(req.headers.access_token);
    const email = decoded.email;
    User.findOne({ where: { email } })
    .then(user => {
        console.log(user, `>>>>> ini dari auth`);
        if (user) {
            req.headers.user = {
                id: user.id,
                email: user.email
            };
            next();
        } else {
            throw { name: "Please login / register first"};
        }
    })
    .catch(err => {
        next(err);
    });
}

module.exports = authentication;