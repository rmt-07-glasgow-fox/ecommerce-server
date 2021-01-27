const errorHandler = (err, req, res, next) => {
    // console.log('masuk error handler');
    // console.log(err.name);
    switch (err.name) {
        case "SequelizeValidationError":
            // console.log(err);
            let error = []
            err.errors.map(err => {
                return error.push(err.message)
            })
            res.status(400).json({ errors: error })
            break;
        case "ResourceNotFound":
            res.status(404).json({ errors: [ "Item Not Found" ] })
            break;
        case "SequelizeUniqueConstraintError":
            res.status(400).json({ errors: [ "Email already registered" ] }) 
            break;
        case "InvalidUser" || "please login first":
            res.status(401).json({ errors: [ "Please Login First" ] })
            break;
        case "SequelizeDatabaseError":
            res.status(400).json({ errors: [ err.name ] })
            break;
        case "invalid email / password":
            res.status(401).json({ errors: [ "Invalid email or Password" ] })
            break;
        case "unauthorize":
            res.status(401).json({ errors: [ "You don't have access" ] })
            break;
        default:
            res.status(500).json({ errors: [ err.name ] })
            break;
    }
}

module.exports = errorHandler