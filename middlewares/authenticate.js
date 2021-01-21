const {Product,User} = require("../models")
const {checkToken} = require("../helpers/jwt")

const authenticate = (req,res,next) => {
  try {
    let decoded = checkToken(req.headers.access_token)
    User.findOne({
      where: {
        email: decoded.email
      }
    })
    .then(find => {
      if(!find) res.status(401).json({message: "Please login first"})
      else {
        req.user = find;
        next();
      }
    })
    .catch(err => {
      next(err)
    })
  } catch(err) {
    next(err)
  }
}

module.exports = {authenticate}