module.exports = (req, res, next) => {
  const role = req.loggedIn.role

  if (role == 'customer') {
      next()
  } else {
      const err = {
          status: 401,
          message: `You're Unauthorized To Do This`
      }
      next(err)
  }
}