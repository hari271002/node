require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
//const jwt = require("jsonwebtoken");

const creatJWT = (payload) => {
  const token = sign(payload, process.env.jwt_secret, {
    expiresIn: process.env.jwt_lifeTime,
  });
  return token;
};

const isTokenValid = (token) => verify(token, process.env.jwt_secret);

const attachCookiesToResponse = (res, payload) => {
  const token = creatJWT(payload);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: process.env.NODE_ENV === "prod",
    signed: true,
  });
};

module.exports = {
  creatJWT,
  isTokenValid,
  attachCookiesToResponse,
};
