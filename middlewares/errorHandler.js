const errorHandler = (err, req, res, next) => {
  if(err){
    switch (err.name) {
      case "WrongEmail":
        res.status(401).json({
          message: "Unauthorized. Something's went wrong check your email or password."
        })
        break;
      case "WrongPassword":
        res.status(401).json({
          message: "Unauthorized. Something's went wrong check your email or password."
        })
        break;
      case 'NoData':
        res.status(404).json({
          message: 'Data not found.'
        })
        break;
      case "InvalidToken":
        res.status(403).json({
          message: "Please provide access token."
        })
        break;
      case "Forbidden":
        res.status(403).json({
          message: "You don't have permission to access this site."
        })
        break;
      case "NotAdmin":
        res.status(403).json({
          message: "You're not authorized to use this service."
        })
        break;
      case 'AlreadyExist':
        res.status(409).json({
          message: 'This data already exist please add a new one.'
        })
        break;
      default:
        if(err.name === 'SequelizeValidationError'){
          let errors = err.errors.map(el => {
            return el.message
          })
          res.status(500).json({
            errors
          })
          break;
        }else if(err.name === 'SequelizeUniqueConstraintError'){
          let errors = err.errors.map(el => {
            return el.message
          })
          res.status(500).json({
            errors
          })
          break;
        }else{
          res.status(500).json({
            message: 'Internal server error.'
          })
          break;
        }
    }
  }
}

module.exports = errorHandler