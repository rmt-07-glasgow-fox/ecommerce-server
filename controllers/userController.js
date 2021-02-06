const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { checkPass } = require('../helpers/bcrypt');

class UserController {

    static login = async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({
                where: { email }
            });
            if (user) {
                if (checkPass(password, user.password)) {
                    const access_token = generateToken({
                        id: user.id,
                        email: user.email
                    });
                    res.status(200).json({ access_token });
                } else {
                    throw { name: 'InvalidInput' };
                }
            } else {
                throw { name: 'InvalidInput' };
            }
        }
        catch(err) {
            next(err);
        }
    }

    static register = async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const user = await User.create({
                email, password
            })
            res.status(201).json({
                id: user.id,
                email: user.email,
                role: user.role
            })
        } catch(err) {
            next(err)
        }
    }
}

module.exports = UserController;