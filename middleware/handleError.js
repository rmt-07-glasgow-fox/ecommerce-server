const errorHandler = (err, req, res, next) => {
    if (err) {
        if (err.name == "SequelizeValidationError") {
            const errors = err.errors.map(err => err.message)
            res.status(400).json({ errors })
        } else if(err.name == "resourceNotFound") {
            res.status(404).json({ message: "not found" })
        }
    }
}

module.exports = errorHandler