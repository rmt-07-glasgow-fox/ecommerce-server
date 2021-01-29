function errorHandler(err, req, res, next) {
  if (err) {
    switch (err.name) {
      case "SequelizeValidationError":
        const message = err.errors.map((error) => error.message);
        res.status(400).json({
          Error: "Validation error",
          message,
        });
        break;
      case "SequelizeUniqueConstraintError":
        res.status(400).json({
          Error: "Validation error",
          message: err.message,
          // message: err.errors[0].message,
        });
        break;
      case "invalidEmailPassword":
        res.status(400).json({
          Error: "Validation error",
          message: "Invalid Email or Password",
        });
        break;
      case "JsonWebTokenError":
        res.status(401).json({
          Error: "Unauthorized",
          message: "The requested page needs a valid username and a password",
        });
        break;
      case "dataNotFound":
        res
          .status(404)
          .json({ Error: "Invalid request", message: "Data not found" });
        break;
      case "forbidden":
        res.status(403).json({
          Error: "Forbidden access",
          message: "You are not authorized to access the file",
        });
        break;
      case "customerOnly":
        res.status(403).json({
          Error: "Forbidden access",
          message:
            "You are not authorized to access, only customers can log in",
        });
        break;
      case "adminOnly":
        res.status(403).json({
          Error: "Forbidden access",
          message: "You are not authorized to access, only admin can log in",
        });
        break;
      case "quantityError":
        res.status(400).json({
          Error: "Validation error",
          message: "Quantity cannot more than Stock",
        });
        break;
      default:
        res.status(500).json({
          Error: "Error from Server",
          message: "Internal server error",
        });
        break;
    }
  }
}

module.exports = errorHandler;
