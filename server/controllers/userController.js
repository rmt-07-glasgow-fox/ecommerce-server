const { User } = require ("../models")
const { checkPassword } = require ("../helpers/bcrypt")
const { getToken } = require ("../helpers/jwt")


class UserController {
    static login (req, res, next) {
        const { email, password } = req.body
        console.log(req.body)
        User.findOne({ where: { email } })
            .then(result => {
                console.log(result)
                if(result) {
                    const isMatch = checkPassword (password, result.password)

                    if (isMatch) {
                        const payload = {
                            id: result.id,
                            username: result.username,
                            email: result.email,
                        }

                        const access_token = getToken(payload)

                        res.status (201).json({ access_token })

                    } else {
                        next ({ name: "WrongInput" })
                    }
                } else {
                    next ({ name: "WrongInput" })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static register (req, res, next) {
        const { username, email, password } = req.body

        User.create ({ username, email, password })
            .then (result => {
                const output = {
                    id: result.id,
                    username: result.username,
                    email: result.email
                }

                res.status(201).json(output)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
}

module.exports = UserController