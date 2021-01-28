module.exports = (err, req, res, next) => {
  if (err) {
    if (err.name === 'SequelizeValidationError') {
      let errorMessage = err.errors.map((err) => {
        return {
          message: err.message,
        };
      });
      res.status(400).json(errorMessage);
    } else if (err.name === 'SequelizeUniqueConstraintError') {
      let errorMessage = err.errors.map((err) => {
        return {
          message: err.message,
        };
      });
      res.status(400).json([errorMessage]);
    } else if (err.name === 'RegisterValidation') {
      res.status(400).json([{ message: 'Must provide firstname, lastname, email and password' }]);
    } else if (err.name === 'LoginValidation') {
      res.status(422).json([{ message: 'Must provide email and password' }]);
    } else if (err.name === 'LoginFailed') {
      res.status(400).json([{ message: 'Invalid email or password' }]);
    } else if (err.name === 'NotFound') {
      res.status(404).json([{ message: `${err.attr} not found` }]);
    } else if (err.name === 'NotUpload') {
      res.status(400).json([{ message: 'Image could not upload' }]);
    } else if (err.name === 'ImageSize') {
      res.status(400).json([{ message: 'Image should be less then 5 Mb in size' }]);
    } else if (err.name === 'FailedUpload') {
      res.status(400).json([{ message: 'Failed upload to server' }]);
    } else if (err.name === 'Required') {
      res.status(400).json([{ message: `${err.attr} is required` }]);
    } else if (err.name === 'Auth') {
      res.status(401).json([{ message: 'You must be logged in.' }]);
    } else if (err.name === 'Member') {
      res.status(400).json([{ message: 'User is already member' }]);
    } else if (err.name === 'NotAdmin') {
      res.status(403).json([{ message: 'You are not Admin' }]);
    } else if (err.name === 'Greater') {
      res.status(400).json([{ message: `${err.attr} must greater than ${err.value}` }]);
    } else if (err.name === 'LimitStock') {
      res.status(400).json([{ message: 'Limit exceeded' }]);
    } else if (err.name === 'Invalid') {
      res.status(400).json([{ message: `${err.attr} invalid` }]);
    } else {
      res.status(500).json([{ message: 'Internal Server Error', error: err }]);
    }
  }
};
