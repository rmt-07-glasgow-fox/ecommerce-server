const errorHandler = (err, req, res, next) => {
    if (err) {
        switch (err.name) {
            case "SequelizeValidationError":
                const errors = err.errors.map((error => error.message))
                res.status(400).json({errors})
                break;
            case "Unauthorized":
                res.status(401).json({message: 'Invalid email or password'})
                break;
            case "Forbidden":
                res.status(403).json({message: 'You dont have permission to access this directory'})
                break;
            case "notFound":
                res.status(404).json({message: 'notFound'})
            break;
            default:
                res.status(500).json({message: 'Internal server error'})
                break;
        }
    }
}

module.exports = errorHandler