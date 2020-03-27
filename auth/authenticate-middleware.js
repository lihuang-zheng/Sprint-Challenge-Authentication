const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (req.payload) {
    next();
  } else if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, payload) => {
      if (err) {
        res.status(401).json({
          error: "Invalid token"
        });
      } else {
        req.payload = payload;
        next();
      }
    });
  } else {
    res.status(401).json({
      error: "Missing token."
    });
  }
};
