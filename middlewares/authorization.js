const { User } = require('../models');

function authorization(req, res, next) {
    const id = req.headers.user.id;
    User.findOne({ where: { id } })
    .then(user => {
        console.log(user);
        if (user) {
            if (user.role === 'admin') {
                next();
            } else {
                throw { name: "This user is not admin" };
            }
        } else {
            throw { name: "Please login / register first"};
        }
    })
    .catch(err => {
        next(err);
    });
};

module.exports = authorization;