function errorHandler (err, req, res, next) {
    if (err) {
        switch(err.name) {
            case "SequelizeValidationError":
                const errors = err.errors.map(el => {
                    return el.message
                })

                res.status(400).json({ errors })
            break

            case "SequelizeUniqueConstraintError":
                res.status(400).json({ errors: ["Email Has Been Registered"] })
            break
            
            case "WrongInput":
                res.status(400).json({ errors: ["Incorrect Email / Password"] })
            break

            case "NotLoggedIn":
                res.status(401).json({ errors: ["Please Login First"] })
            break

            case "OutOfStock":
                res.status(400).json({ errors: ['Sorry..We Ran Out of Product'] })
            break

            case "Unauthorized":
                res.status(401).json({ errors: ['You Have No Authorize to Make Change'] })
            break

            case "ResourceNotFound":
                res.status(404).json({ errors: ["Not Found"] })
            break

            default:
                res.status(500).json({ errors: ["Internal Server Error"] })
            break
        }
    }
}

module.exports = {
    errorHandler
}