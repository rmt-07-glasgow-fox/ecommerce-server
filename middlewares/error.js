function error(err, req, res, next) {
    if(err) {
        switch(err.name) {
            case "SequelizeValidationError":
                const errors = err.errors.map((error => error.message))
                res.status(400).json({
                errors
                })
                break;
            case "notFound":
                res.status(404).json({message: "Error data not found"})
                break;
            case "NotAuthorized":
                res.status(403).json({message: "No Authorization"})
                break;
            case "Invalid":
                res.status(401).json({message: "Invalid email/password"})
                break;
            default:
                res.status(500).json({message: "Internal Server Error"})
                break;
        }
    }
}

module.exports = error