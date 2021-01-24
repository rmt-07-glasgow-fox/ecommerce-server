const errorHandler = (err, req, res, next) => {
  if (!err) next()
  switch (err.name) {
  case 'SequelizeUniqueConstraintError':
  case 'SequelizeValidationError':
    res.status(400).json({
      message: 'Validation Error',
      errors: err.errors.map( error => error.message )
    })
    break

  case 'Error':
    res.status(400).json({
      message: 'Validation Error',
      errors: [err.message]
    })
    break

  case 'WrongEmail':
  case 'WrongPassword':
    res.status(400).json({
      message: 'Please check your email/password'
    })
    break

  case 'Unauthenticated':
    res.status(401).json({ message: 'Please login first' })
    break

  case 'Unauthorized':
    res.status(403).json({ message: 'You are not allowed' })
    break

  case 'ProductNotFound':
    res.status(404).json({ message: 'Product not found' })
    break

  default:
    console.log(err.name)
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = errorHandler
