const errorHandlers = (err, req, res, next) => {
    if(err) {
        switch (err.name) {
            case "SequelizeValidationError":
                const errMsg = err.errors.map( el => {
                    return { message: el.message }
                } )
                res.status(400).json(errMsg)
                break;
            case "loginFailed":
                res.status(400).json({ message: "Invalid email/ password" })
                break;
            case "SequelizeUniqueConstraintError":
                res.status(400).json([{ message: "Email already been used" }])
                break;
            case "notEnoughStock":
                res.status(400).json({ message: "Stock is not enough" })
                break;
            case "notLogin":
                res.status(401).json({
                    message: "Please login first",
                    description: "JWT success but UserId not found"
                })
                break;
            case "JsonWebTokenError":
                res.status(401).json({
                    message: "Please login first",
                    description: "JWT error (not provided or malformed)"
                })
                break;
            case "unauthorized":
                res.status(401).json({ message: "Unauthorized access" })
                break;
            case "notFound":
                res.status(404).json({ message: "Not found" })
                break;
            default:
                res.status(500).json({
                    message: "Internal Server Error"
                })
                break;
        }
    }
}

module.exports = errorHandlers