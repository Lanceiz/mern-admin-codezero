exports.requireRoles = (...allowedRoles) => (req, res, next) => {
  const role = req.admin && (req.admin.role || "admin");

  if (!allowedRoles.includes(role)) {
    return res.status(403).json({
      success: false,
      result: null,
      message: "You do not have permission to access this resource.",
    });
  }

  next();
};
