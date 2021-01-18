const { User } = require("../models")
const { compare } = require("../helpers/hashPassword.js")
const { makeToken } = require("../helpers/jwt")

class userController {

    static login(req, res, next) {
        const {
            email,
            password
        } = req.body

        User.findOne({
            where: { email }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: "data not found",
                        code: 404
                    })
                } else {
                    if (compare(password, data.password) == true) {
                        const payload = {
                            id: data.id,
                            email: data.email,
                        }
                        const access_token = makeToken(payload)
                        res.status(200).json({ access_token })
                    } else {
                        next({
                            message: "data not found",
                            code: 404
                        })
                    }
                }
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500
                })
            })
    }

}

module.exports = userController