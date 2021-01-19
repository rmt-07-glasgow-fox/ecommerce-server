function errorHandler(err, req, res, next) {
    if (err) {
        if (err.name === 'EmptyInput') {
            res.status(400).json({message: "Email/Password is required"})
        }
        if (err.name === 'ResourceNotFound') {
            res.status(404).json({message: 'Email/Password Invalid'})
        } if (err.name === 'EmailInvalid') {
            res.status(400).json({message: "Please log in first"})
        }
        else {
            res.status(500).json({message: err.name})
        }
    }
}

module.exports = errorHandler