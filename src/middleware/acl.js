module.exports = (capability) => {
  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) next();

      next("Access Denied !!");
    } catch (error) {
      next(error.message);
    }
  };
};
