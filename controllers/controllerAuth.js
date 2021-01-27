const { User, Sequelize } = require('../models')
const { checkPassword } = require('../helpers/bcryptjs.js')
const { generateToken, checkToken } = require('../helpers/jwt')

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
            
            await User.build({ email, password, role }).validate()
            const found = await User.findOne({
                where: Sequelize.and({
                    email: email,
                    role: role
                })
            })

            if (!found) next({ name: "loginFailed" })
            const match = checkPassword(password, found.password)

            if (!match) next({ name: "loginFailed" })
            else {
                const payload = {
                    id: found.id,
                    email: found.email,
                    role: found.role
                }
                const access_token = generateToken(payload)

                return res.status(200).json({
                    access_token: access_token
                })
            }
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

    static async tokening(req, res, next) {
        try {
            const user = checkToken(req.headers.access_token)
            const found = await User.findByPk(user.id)
    
            if (!found) next({ name: 'notLogin' })
            else {
                return res.status(200).json({
                    id: found.id,
                    email: found.email
                })
            }
        } catch (err) {
            next(err)
        }
    }
}