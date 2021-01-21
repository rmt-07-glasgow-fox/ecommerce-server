module.exports = async (req, res, next) => {
  try {
    const user = req.user
    console.log(user);
    if (user.role === 'admin') {
      next()
    } else {
      next({name: "Unauthorized"})
    }
  } catch (error) {
    next(error)
  }
}