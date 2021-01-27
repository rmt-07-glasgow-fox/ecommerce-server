function errorHandlers (err, req, res, next) {
  console.log (err.name, 'err.name')
  console.log (err.message, 'err.message')
  console.log (err)
  if (err.errors) {
    var errors = err.errors.map (e => {
      return e.message
    })
  }

  switch (err.name) {
    case 'SequelizeValidationError':
      res.status (400).json ({errors})
      break;
    case 'SequelizeUniqueConstraintError':
      res.status (400).json ({message: 'Email has already been used'})
      break;
    case 'Error not found':
      res.status (404).json ({message: 'Error not found'})
      break;
    case 'Invalid email / password':
      res.status (400).json ({message: 'Invalid email / password'})
      break;
    case 'Unauthorized access':
      res.status (401).json ({message: 'Unauthorized access'})
      break;
    case 'Product already added':
      res.status (400).json ({message: 'Product already added to shopping cart'})
      break;
    case 'JsonWebTokenError':
      res.status (401).json ({message: 'Please login first'})
      break;
    default:
      res.status (500).json ({message: 'Internal server error'})
  }
}

module.exports = errorHandlers