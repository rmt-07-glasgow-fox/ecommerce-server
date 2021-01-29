function errorHandler(err, req, res, next) {
  if (err) {
    switch (err.status) {
      case 400:
        if(err.errors){
          let errMsg = []
          err.errors.forEach( el => {
              errMsg.push(el.message)
          })
          res.status(400).json({
              message: errMsg
          })
        } else if (err.message) {
          res.status(400).json({
            message: err.message
          })
        }
        break;
      case 401:
        if (err.message) {
          res.status(401).json({
            message: err.message
          })
        } else {
          res.status(401).json({
            message: "User not authorized"
          })
        }
        break;
      case 404:
        res.status(404).json({
          message: "Data not found"
        })
        break;
      default:
        res.status(500).json({
          message: "Internal server error"
        })
        break;
    }
  }
}

module.exports = errorHandler