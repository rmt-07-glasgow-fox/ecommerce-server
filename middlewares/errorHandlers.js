
const errorHandlers = (error, req, res, next) => {
  if (error) {
    switch (error.name) {
      case 'SequelizeValidationError':
          let msg = error.errors.map((err) => err.message)
        res.status(400).json(msg)
        break;

      case 'invalidLogin':
        res.status(401).json({msg: 'Invalid email / password'})
        break;

      case 'notAuthorize':
        res.status(401).json({msg: 'You dont have authorize'})
        break;

      case 'notLogin':
        res.status(401).json({msg: 'You need login first'})
        break;

      case 'notValid':
        res.status(401).json({msg: 'User is not valid'})
        break;

      case 'notFound':
        res.status(404).json({msg: 'Not Found'})
        break;

      case "cantRetrieve":
        res.status(500).json({msg: 'Cannot retrieve data, please try again later'})
        break;

      default:
        res.status(500).json({msg: error.message ? error.message : 'Internal Server Error'})
        break;
    }
  }
}


module.exports = { errorHandlers }