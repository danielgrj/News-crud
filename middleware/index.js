exports.catchErrors = fn => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
};

exports.checkRoles = role => {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) return next();
    res.redirect("/profile");
  };
};
