const express = require("express");
const {
  userLogin,
  userRegister,
} = require("../controllers/auth.controller.js");

var auth = express.Router();

auth.post("/login", userLogin);
auth.post("/register", userRegister);

module.exports = auth;
