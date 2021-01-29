const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

module.exports = {
    async authenticate (req, res, next) {
        try {
            let { email } = verifyToken(req.headers.access_token);
            let user = await User.findOne({ where: { email }});

            if (!user) throw new Error('ForbiddenAcces');

            req.user = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }

            next()
        } catch (error) {
            next(error)
        }
    },
    async authorize (req, res, next) {
        try {
            let userRole = req.user.role;
            if (userRole !== 'admin') {
                throw new Error ('NotAuthorize');
            }

            next();
        } catch (error) {
            next(error)
        }
    }
}