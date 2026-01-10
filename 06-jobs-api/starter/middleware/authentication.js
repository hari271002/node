const user = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const verifyJWT = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authorization is missing");
  }
  const token = auth.split(" ")[1];
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: verify.userId, name: verify.userName };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid Authorization");
  }
};

module.exports = verifyJWT;
