const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
      const errors = err.errors.map(err => err.message)
      res.status(400).json({errors})
      break
    case "errorLogin":
      res.status(401).json({errors: "Invalid email / password"})
      break
    case "Not Authorized":
      res.status(401).json({errors: ["You don't have access"]})
      break
    case "Not Found":
      res.status(404).json({errors: ["Not Found"]})
      break
    default:
      res.status(500).json({errors: "Internal Server Error"})
      break
  }
}

module.exports = errorHandler