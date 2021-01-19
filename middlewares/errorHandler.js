const errorHandler = (err, req, res, next) => {
    console.log(err)
    const errors = err.errors.map(error => error.message)
    res.status(400).json({
        errors
    })
}

module.exports = errorHandler
