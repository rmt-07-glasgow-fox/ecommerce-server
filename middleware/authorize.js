module.exports = async (req, res, next) => {
  try {
    const user = req.user;
    user.role === "admin" ? next() : next({ name: "Unauthorized" });
  } catch (error) {
    next(error);
  }
};
