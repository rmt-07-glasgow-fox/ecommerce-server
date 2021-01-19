const errorHandler = (err, req, res, next) => {
    console.log(err.name)
    switch(err.name) {
        case 'SequelizeValidationError':
            res.status(400).json(
                err.errors.map(err => {
                    return { message: err.message }
                })
            );
            break;
        case 'SequelizeUniqueContraintError':
            res.status(400).json({ message: 'Input has been existed in the database' });
            break;
        case 'InvalidAccessToken':
            res.status(401).json({ message: 'Please log in first' });
            break;
        case 'Unauthorized':
            res.status(403).json({ message: `You're unauthorized to access this item` });
            break;
        case 'InvalidInput':
            res.status(400).json({ message: 'Wrong email or password' });
            break;
        case 'NotFound':
            res.status(404).json({ message: 'Not Found'});
            break;
        default:
            res.status(500).json({ message: err.message });
            break;
    }
}

module.exports = errorHandler;