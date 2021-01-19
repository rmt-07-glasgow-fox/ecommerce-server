const errorHandler = (err, req, res, next) => {
  if (err) {
    const errors = []

    switch (err.name) {
      case "AuthError":
        errors.push("Wrong email / password")
        res.status(401).json({ errors })
        break
      default:
        errors = err.errors.map(error => error.message)
        res.status(400).json({
          errors
        })
    }
  }
}

module.exports = errorHandler
