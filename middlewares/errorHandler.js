function errorHandler(err, req, res, next) {
  switch(err.name) {
    case 'InvalidPassOrEmail':
      res.status(404).json({message: 'Password or Email is not valid'})
      break
    case 'SequelizeValidationError':
      const errors = err.errors.map(e => e.message)
      
      res.status(400).json({ errors })
      break
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({ message: 'Please register with a different email account' })
      break
    case 'accessDenied':
      res.status(401).json({message: `You don't have access for this action`})
      break;
    case 'resourceNotFound':
      res.status(404).json({message: 'resource not found'})
      break
    case 'JsonWebTokenError':
      res.status(401).json({message: 'JWT must be provided'})
      break;
    default: 
      res.status(500).json({message: 'internal server error'})
      break
  }
}

module.exports = { errorHandler }

