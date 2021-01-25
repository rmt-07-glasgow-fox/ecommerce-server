function errorHandler(err, req, res, next) {
    let errors = []
    switch (err.name) {
        case 'SequelizeDatabaseError':
            res.status(400).json(err.message)

            break;
        case 'authentication':
            res.status(404).json('Authentication Not found')

            break;
        case 'SequelizeValidationError':
            errors = []
            err.errors.forEach(e=>{
                errors.push(e.message)
            })
            res.status(400).json(errors)

            break;
        case 'SequelizeUniqueConstraintError':
            errors = []
            err.errors.forEach(e=>{
                errors.push(e.message)
            })
            res.status(400).json(errors)

            break;
        case 'notFound':
            res.status(404).json({message:'Not found'})

            break;
        case 'unauthorized':
            res.status(401).json({message:'Invalid authorized'})

            break;
        case 'JsonWebTokenError':
            res.status(401).json({message:'Authentication Required'})

            break;
        case 'invalidLogin':
            res.status(404).json({message:'Invalid email or password'})

            break;
        case 'emptyEmail':
            res.status(400).json({message:'Email is required'})

            break;
        case 'emptyPassword':
            res.status(400).json({message:'Password is required'})

            break;
        default:
            if (err.name) {
                res.status(500).json({message:'Internal server error'})
            } else {
                res.status(401).json({message:'Unknown error'})
            }

            break;
    }
}

module.exports = errorHandler