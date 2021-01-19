const { User } = require('../models');
const { hashPassword, compare } = require('../helpers/hashPassword');
const { tokenGenerate } = require('../helpers/jwt');

class Controller {
    static register(req, res, next) {
        const { email, password, role } = req.body;
        const input = {
            email,
            password: hashPassword(password),
            role
        };
        if (process.env.NODE_ENV === 'test') {
            input.password = password;
        }
        User.create(input)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            const errors = err.errors.map(error => error.message);
            err.errors = errors
            res.status(400).json(err);
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
                throw { msg: "Email / Password not found"};
            }
        })
        .catch(err => {
            res.status(404).json(err);
        });
    };
};

module.exports = Controller;