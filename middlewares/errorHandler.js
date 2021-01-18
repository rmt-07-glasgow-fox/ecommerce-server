const errorHandler = (err, req, res, next) => {
    const errors = err.errors.map(error => error.message)
    res.status(400).json({
        errors
    })
}

module.exports = errorHandler
