module.exports = errorHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json({message: err.message})
    } else if (err.name == `SequelizeValidationError` || err.name == `SequelizeUniqueConstraintError`) {
        let errors = []

        for (let i = 0; i < err.errors.length; i++) {
            const element = err.errors[i];
            if (element.message == `email must be unique`) {
                errors.push(`Email is Already Registered`)
            } else {
                errors.push(element.message)
            }
        }
        let error = errors.join(', ')
        res.status(400).json({message: error})
    } else if (err.name == `SequelizeForeignKeyConstraintError`) {
        res.status(403).json({message: `Cannot Delete If The Category Still Used By Product(s)`})
    } else {
        res.status(500).json({message: `Internal Server Error`})
    }
}