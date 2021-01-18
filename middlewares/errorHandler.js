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