var express = require("express");
const { userLogin, userRegister } = require("../controllers/auth.controller");

var auth = express.Router();

auth.post("/login", userLogin);
auth.post("/register", userRegister);

module.exports = auth;
