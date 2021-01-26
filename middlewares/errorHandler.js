function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
      let errorVal = err.errors.map((e) => e.message);
      res.status(400).json({ errors: errorVal });
      break;

    case "SequelizeUniqueConstraintError":
      let errorUnique = err.errors.map((e) => e.message);
      res.status(400).json({ errors: errorUnique });
      break;

    case "NoEmail":
      res.status(400).json({
        errors: ["Email is required"],
      });
      break;

    case "NoPassword":
      res.status(400).json({
        errors: ["Password is required"],
      });
      break;

    case "InvalidCredentials":
      res.status(400).json({
        errors: ["Invalid email/password"],
      });
      break;

    case "NoToken":
      res.status(400).json({
        errors: ["Token is required"],
      });
      break;

    case "InvalidToken":
      res.status(400).json({
        errors: ["Invalid Token"],
      });
      break;

    case "Unauthorized":
      res.status(401).json({
        errors: ["Unauthorized"],
      });
      break;

    case "ProductNotFound":
      res.status(404).json({
        errors: ["Product not found"],
      });
      break;

    case "NoChange":
      res.status(400).json({
        errors: ["No change was committed"],
      });
      break;

    case "AmountExceedsStock":
      res.status(400).json({
        errors: ["The amount entered exceeds stock"],
      });
      break;
    
    case "CartNotFound":
      res.status(404).json({
        errors: ["Cart not found"],
      });
      break;

    case "NoMatch":
      res.status(404).json({
        errors: ["Cart item and product id does not match"],
      });
      break;

    default:
      res.status(500).json({ err });
      break;
  }
}

module.exports = errorHandler;
