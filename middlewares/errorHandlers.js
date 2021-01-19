const errorHandlers = (err, req, res, next) => {
  if (err) {
    let errorMessages
    switch (err.name) {
      case 'SequelizeValidationError':
        errorMessages = err.errors.map(err => {
          return {
            column: err.path,
            message: err.message
          }
        })
        return res.status(400).json(errorMessages)
      case 'SequelizeUniqueConstraintError':
        errorMessages = err.errors.map(err => {
          return {
            column: err.path,
            message: err.message
          }
        })
        return res.status(400).json(errorMessages)
      case 'invalidUserPassword':
        return res.status(401).json({message: 'Invalid email / password'})
      case 'notFound':
        return res.status(404).json({message: 'Error Product not found'})
      default:
        return res.status(500).json({message: 'Internal Server Error'})
    }
  }
}

module.exports = errorHandlers