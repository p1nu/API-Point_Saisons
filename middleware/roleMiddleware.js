const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.user_role_id !== requiredRole) {
      return res.status(403).json({ message: 'Access Denied!' });
    }
    next();
  }
}

module.exports = roleMiddleware;