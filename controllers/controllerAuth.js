const { User } = require('../models')
const { checkPassword } = require('../helpers/bcryptjs.js')

module.exports = class ControllerAuth {
    static register(req, res, next) {
        const { email, password, role } = req.body
        const newData = {
            email,
            password,
            role
        }
        User.create(newData)
        .then( data => {
            return res.status(201).json({ message: "Register success" })
        } )
        .catch( err => {
            next(err)
        } )
    }

    static async login(req, res, next) {
        try {
            const { email, password, role } = req.body
            const found = await User.findOne({
                where: {
                    email: email,
                    role: role
                }
            })

            if (!found) next({ name: "loginFailed" })

            const match = checkPassword(password, found.password)

            if (!match) next({ name: "loginFailed" })
            else return res.status(200).json({ message: "Login success" })
        } catch (err) {
            next(err)
        }
    }

    static async showUser(req, res, next) {
        try {
            const data = await User.findAll({
                attributes: {
                    exclude: [ 'password', 'createdAt', 'updatedAt' ]
                }
            })

            return res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const hapus = await User.destroy({
                where: {
                    id: +req.params.id
                }
            })

            if (!hapus) next({ name: "notFound" })
            else return res.status(200).json({ message: "User has been deleted" })
        } catch (err) {
            next(err)
        }
    }
}