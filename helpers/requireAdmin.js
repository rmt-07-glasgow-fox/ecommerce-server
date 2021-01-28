module.exports = (req, res, next) => {
  if (!req.user) return next({ name: 'Auth' });

  if (req.user.role !== 'admin') return next({ name: 'NotAdmin' });
  next();
};
