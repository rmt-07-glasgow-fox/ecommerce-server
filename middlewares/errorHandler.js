function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
      let alert = err.errors.map((error) => error.message)
      return res.status(400).json(alert)

    case "SequelizeUniqueConstraintError":
      let errorMsg = err.errors.map((error) => error.message)
      return res.status(400).json(errorMsg)

    case "NoMail":
      return res.status(400).json({
        errors: ["Email is required"],
      })
    case "NoPassword":
      return res.status(400).json({
        errors: ["Password is required"],
      })
        
    case "InvalidEmail":
      return res.status(400).json({
        errors: ["Invalid email or password"],
      })

    case "InvalidPassword":
      return res.status(400).json({
        errors: ["Invalid email or password"],
      })

    case "UnregisteredUser":
      return res.status(401).json({
        message: "Please login first",
      })

    case "NotFound":
      return res.status(404).json({
        message: "Not found",
      })

    case "UnauthorizedUser":
      return res.status(401).json({
        message: "You are unable to access this content",
      })

    default:
      return res.status(500).json({
        message: "Internal Server Error",
      })
  }
}

module.exports = errorHandler
