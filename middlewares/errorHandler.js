const errorHandler = (err, req, res, next) => {
  if(err) {    
    switch (err.name) {
      
      case 'SequelizeValidationError':
      case 'SequelizeUniqueConstraintError':              
        const errorMessages = err.errors.map(e => {
          return e.message
        });
        const response = { name: 'Bad Request', errors: errorMessages };
        res.status(400).json(response);
        break;
        
      case 'Invalid email/password':
        res.status(400).json({
          name: 'Bad Request',
          message: err.name 
        });
        break;

      case 'Please login first':
        res.status(400).json({
          name: 'Bad Request',
          message: err.name
        });
        break;

      case 'Unauthorized':
        res.status(401).json({
          name: err.name,
          message: 'Not authorized'
        });
        break;

      case 'Email is required':
        res.status(400).json({
          name: 'Bad Request',
          message: err.name
        });
        break;

      case 'Password is required':
        res.status(400).json({
          name: 'Bad Request',
          message: err.name
        });
        break;


      default:
        res.status(500).json({
          name: 'Internal server error',
          message: err
        });
        break;
    }
  }

}


module.exports = errorHandler;