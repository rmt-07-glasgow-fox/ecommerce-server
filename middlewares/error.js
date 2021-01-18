const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
      const errors = err.errors.map(err => err.message)
      res.status(400).json({errors})
      break
    case "errorLogin":
      res.status(400).json({errors: ["Invalid email / password"]})
      break
  }
}

module.exports = errorHandler