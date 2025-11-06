const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  //console.log(req.body);
  if (!username || !password) {
    throw new CustomAPIError("Username and password are mandatory", 400);
  }
  const id = Date.now();
  const token = jwt.sign({ id, username }, process.env.JWTKEY, {
    expiresIn: "1h",
  });
  res.status(200).json({ msg: "User Logged in", token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  //console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("Valid Auth is required", 401);
  }
  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    var verify = jwt.verify(token, process.env.JWTKEY);
    console.log(verify);
  } catch (error) {
    throw new CustomAPIError("Not able to access due to invalud auth", 401);
  }
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hi ${verify.username}`,
    secret: `Here is your lucky number ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
