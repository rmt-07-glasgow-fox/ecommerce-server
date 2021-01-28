const errorHandlers = (err, req, res, next) => {
    if (err) {
        switch (err.name) {
            case "SequelizeValidationError":
                let errors = err.errors.map(err => err.message)
                res.status(400).json({errors})
            break;
            case 'Invalid Email/Password':
                res.status(400).json({ errors:['Invalid Email/Password'] })
            break

            default:
                res.status(500).json({message: "Internal Server error"})
        }
    }
}

module.exports = {errorHandlers}