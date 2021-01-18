const { User } = require('../models')

class UserController {

    static async login(req, res, nex) {
        try {

        } catch (err) {
            res.status(500).json(err)
        }
    }

}

module.exports = UserController