export const authorize = (policy, resource) => {
  return (req, res, next) => {
    const user = req.user;

    if (policy(user, resource)) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden", status: 403 });
    }
  };
};
