const errorHandlers = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
            let errors = err.errors.map(error => error.message);
            err.errors = errors
            res.status(400).json({ errors: err.errors });
            break;
        case "resourceNotFound":
            res.status(404).json({ message: "error not found"});
            break;
        case "Product not found":
            res.status(404).json({ message: "Product not found"});
            break;
        case "There is no active Cart":
            res.status(404).json({ message: "There Is No Active Cart"});
            break;
        case "Email / Password not found":
            res.status(404).json({ message: "Email / Password not found"});
            break;
        case "Please login / register first":
        case "TypeError":
            res.status(403).json({ message: "Please login / register first"});
            break;
        case "This user is not admin":
            res.status(403).json({ message: "This user is not admin"});
            break;
        case "You not authorize to continue":
            res.status(403).json({ message: "You not authorize to continue"});
            break;
        default:
            res.status(500).json({ message: "Internal Server Error"});
            break;
    }

}

module.exports = errorHandlers