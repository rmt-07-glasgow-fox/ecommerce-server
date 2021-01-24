
function errorHandler (err, req, res, next) {
  //console.log(err)
  let errors

  switch (err.name) {
    case 404: 
      res.status(404).json({errors: err.message})
      break;
    case 401:
      res.status(401).json({errors: err.message})
      break;
    case 'SequelizeValidationError':
      errors = err.message.split(',\n')
      res.status(400).json({errors})
      break;
    default:
      console.log(err)
  }
}

module.exports = errorHandler