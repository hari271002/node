//const express = require("express");

const welcomeTask = (req, res) => {
  res.status(200).json("Welcome Task");
};

module.exports = { welcomeTask };
