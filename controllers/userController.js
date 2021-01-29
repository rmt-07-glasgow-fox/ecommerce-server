const { User } = require('../models');
const { compare } = require('../helpers/hashPassword');
const { tokenGenerate } = require('../helpers/jwt');

class Controller {
    static register(req, res, next) {
        const { email, password, role } = req.body;
        const input = {
            email,
            password,
            role
        };
        User.create(input)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            next(err);
        });
    };

    static login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({ where : { email } })
        .then(user => {
            if (user && compare(password, user.password)) {
                const payload = {
                    email: user.email,
                    role: user.role
                }
                const access_token = tokenGenerate(payload);
                res.status(200).json({access_token});
            } else {
                throw { name: "Email / Password not found"};
            }
        })
        .catch(err => {
            next(err);
        });
    };
};

module.exports = Controller;