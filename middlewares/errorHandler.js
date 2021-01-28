function errorHandler(err, req, res, next) {
    if (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(e => e.message)
            res.status(400).json({message: errors})
        } else if (err.name === 'AuthError') {
            res.status(401).json({message: 'Access Denied! Please login first'})
        } else if (err.name === 'EmptyInput') {
            res.status(400).json({message: "Email/Password is required"})
        } else if (err.name === 'ResourceNotFound') {
            res.status(404).json({message: 'Email/Password Invalid'})
        } else if (err.name === 'EmailInvalid') {
            res.status(400).json({message: "Please log in first"})
        } else if (err.name === 'StockNotEnough') {
            res.status(400).json({message: "We do not have enough stock to fulfill your order"})
        } else {
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = errorHandler