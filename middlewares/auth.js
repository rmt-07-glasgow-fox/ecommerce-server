const { User } = require('../models');
const { checkToken } = require('../helpers/jwt');

const authenticate = async (req, res, next) => {
    const decoded = checkToken(req.headers.access_token);
    try {
        const user = await User.findOne({
            where: {
                email: decoded.email
            }
        });
        if (user) {
            req.user = { id: user.id };
            next();
        } else {
            throw { name: 'InvalidAccessToken' };
        }
    }
    catch(err) {
        next(err);
    }
}

const authorize = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        if (user.role == 'admin') {
            next();
        } else {
            throw { name: 'Unauthorized' };
        }
    }
    catch(err) {
        next(err);
    }
}

module.exports = { authenticate, authorize };