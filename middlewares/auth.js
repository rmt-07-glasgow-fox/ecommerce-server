const { User, Cart } = require('../models');
const { checkToken } = require('../helpers/jwt.js');

const authenticate = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token;
    const decoded = checkToken(access_token);  
    const userFound = await User.findOne({ where: { email: decoded.email } });
    if(!userFound) return next({ name: 'Please login first' });
    req.userId = userFound.id;
    return next();
  }
  catch (err) {
    console.log("🚀 ~ file: auth.js ~ line 14 ~ authenticate ~ err", err)    
    return next(err);
  }
};

const authorize = async (req, res, next) => {
  try {
    const id = req.userId;
    const isAdmin = await User.findOne({ where: { id: id , role: 'admin' } });
    if(!isAdmin) return next({ name: 'Unauthorized' });
    return next();
  }
  catch (err) {
    return next(err);    
  }
}

const cartAuthorize = async (req, res, next) => {
  try {
    const UserId = req.userId;
    const id = req.params.id;
    console.log(UserId, id, '<<<<');
    const cart = await Cart.findOne({ where: { id , UserId } });
    if(!cart) return next({ name: 'Unauthorized' });
    return next();
  }
  catch (err) {
    return next(err);    
  }
}

module.exports = {
  authenticate,
  authorize,
  cartAuthorize
};