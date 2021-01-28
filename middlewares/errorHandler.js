function errorHandlers(err, req, res, next) {
    console.log(err);
    let eror = []
    switch (err.name) {
        case 'SequelizeValidationError':
            err.errors.forEach(e => {
                eror.push({message: e.message})
            });
            return res.status(400).json(eror)
        case 'SequelizeUniqueConstraintError':
            err.errors.forEach(e => {
                eror.push({message: e.message})
            });
            return res.status(400).json(eror)
        case 'badRequest':
            return res.status(400).json({message: err.message})
        case 'JsonWebTokenError':
            return res.status(401).json({message: err.message})
        case 'NotLogin':
            return res.status(401).json({message: err.message})
        case 'Unauthorized':
            return res.status(401).json({message: err.message})
        case 'Forbidden':
            return res.status(403).json({message: err.message})
        case 'NotFound':
            return res.status(404).json({message: err.message})
        default:
            return res.status(500).json({message: 'internal server error'})
    }
}

module.exports = errorHandlers