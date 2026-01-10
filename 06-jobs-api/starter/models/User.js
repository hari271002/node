const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dataModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is a required field"],
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, "email is a required field"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required field"],
    minlength: 6,
  },
});

dataModel.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

dataModel.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, userName: this.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

dataModel.methods.verifyPassword = async function (userPassword) {
  const res = await bcrypt.compare(userPassword, this.password);
  return res;
};

module.exports = mongoose.model("User", dataModel);
