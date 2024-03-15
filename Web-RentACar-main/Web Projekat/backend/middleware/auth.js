const jwt = require("jsonwebtoken");

const authenticationMiddleware = (allowedRoles) => async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "You can't go further" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username, userRole } = decoded;
    if (!allowedRoles.includes(userRole)) {
      return res.status(401).json({ error: "You can't go further" });
    }
    req.user = { id, username, userRole };
    next();
  } catch (error) {
    return res.status(401).json({ error: "You can't go further" });
  }
};

module.exports = authenticationMiddleware;