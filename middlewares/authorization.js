module.exports = (req,res,next) => {
  const role = req.user.role

  if(role == 'admin') {
    next()
  } else {
    const err = {
      status: 401,
      message: 'unauthorized access'
    }
    next(err)
  }
}