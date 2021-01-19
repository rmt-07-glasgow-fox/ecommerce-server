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
                throw { msg: "This user is not admin" };
            }
        } else {
            throw { msg: "Please login / register first"};
        }
    })
    .catch(err => {
        res.status(403).json(err);
    });
};

module.exports = authorization;