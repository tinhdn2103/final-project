const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthenticated" });

  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if (err) return res.status(403).json({ message: "Unauthenticated" });
    req.user = user;
    next();
  });
};

module.exports = verify;
