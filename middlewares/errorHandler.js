const errorHandler = (err, req, res, next) => {
  if (err) {
    switch (err.name) {
      case "SequelizeValidationError":
        let errorMessage = err.errors.map(err => err.message)
        return res.status(400).json({errors: errorMessage})

      case "SequelizeUniqueConstraintError":
        return res.status(400).json({
          message: err.message
        })

      case "NotLoggedIn":
        return res.status(401).json({
          message: "Please login first"
        })

      case "WrongLogin":
        return res.status(401).json({
          message: "Invalid email/password"
        })

      case "Unauthorized":
        return res.status(401).json({
          message: "You're unauthorized to do this"
        })

      case "NotFound":
        return res.status(404).json({
          message: "Not found"
        })

      default:
        return res.status(500).json({
          message: "internal server error"
        })
    }
  }
}

module.exports = errorHandler