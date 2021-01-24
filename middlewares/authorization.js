const { User } = require("../models")

async function authorize(req, res, next) {
    try {
        let user = await User.findOne({
            where: {
                email: req.user.email
            }
        })
        if (!user || user.role !== 'admin') {
            next({
                message: "you are not admin",
                code: 401,
            })
        } else {
            next()
        }
    } catch (err) {
        next({
            message: err.message,
            code: 500,
        })
    }
}



module.exports = authorize