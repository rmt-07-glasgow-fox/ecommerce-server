const errorHandler = (err, req, res, next) => {
  if (err) {
    switch (err.name) {
      case "SequelizeValidationError":
        let errorMessage = err.errors.map(err => {
          return {
            message: err.message
          }
        })
        return res.status(400).json(errorMessage)

      case "SequelizeUniqueConstraintError":
        return res.status(400).json({
          message: err.message
        })

      case "NotLoggedIn":
        return res.status(401).json({
          message: "aaaaaaaaaaaaaa"
        })

      case "WrongLogin":
        return res.status(401).json({
          message: "Invalid email/password"
        })

      case "Unauthorized":
        return res.status(401).json({
          message: "aaaaaaaaaaaaaa"
        })

      case "NotFound":
        return res.status(404).json({
          message: "aaaaaaaaaaaaaa"
        })

      default:
        return res.status(500).json({
          message: "internal server error"
        })
    }
  }
}

module.exports = errorHandler