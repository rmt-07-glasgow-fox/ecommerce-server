const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
            const errors = err.errors.map(el => el.message)

            res.status(400).json({
                errors
            })
            break;

        case "SequelizeUniqueConstraintError":
            const unique = err.errors.map(el => el.message)

            res.status(400).json({
                errors: unique
            })
            break;

        case "authValidate":
            res.status(401).json({
                errors: 'username or password wrong!'
            })
            break;

        default:
            res.status(500).json({
                status: 'error',
                message: err.message
            })
            break;
    }
}

module.exports = errorHandler;