module.exports = (err, req, res, next) => {
    let errorType = err.message;

    if (err.name === 'SequelizeValidationError') errorType = err.name
    if (err.name === 'JsonWebTokenError') errorType = err.name

    switch (errorType) {
        case 'SequelizeValidationError':
            res.status(400).json({ errors: err.errors.map(error => error.message) })
        break

        case "ForbiddenAccess":
            res.status(401).json({ errors: 'Forbidden access' })
        break

        case "JsonWebTokenError":
            res.status(401).json({ errors: 'Forbidden access' })
        break

        case "NotAuthorize":
            res.status(403).json({ errors: 'Not authorize' })
        break

        case 'ProductNotFound':
            res.status(404).json({ errors: 'Product not found' })
        break

        case 'InvalidEmailPassword':
            res.status(404).json({ errors: 'Invalid email / password' })
        break

        default:
            res.status(500).json({ errors: err.message })
        break
    }
}