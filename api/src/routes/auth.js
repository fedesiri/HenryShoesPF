const express = require("express");
const auth = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../middlewares/google.js");
const {generateToken} = require("../middlewares/authJwt.js")

auth.post("/register", (req, res, next) => {
  passport.authenticate("local-register", (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).send({ message: "User already exists" });
    } else {
      const token = generateToken(user)
      return res.status(201).send({user, token});
    }
  })(req, res, next);
});

auth.post("/login", (req, res, next) => {
  passport.authenticate("local-login", (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    } else {
     const token = generateToken(user)
      return res.status(200).send({user, token});
    }
  })(req, res, next);
});

auth.get("/login/success", (req, res, next) => {
  if (req.user) {
    res.status(200).send({
      message: "Login Successful",
      success: true,
      user: req.user,
      cookies: req.cookies,
    });
  }
  console.log(req.user, "USSEEERRR");
});
auth.get("/google/failure", (req, res, next) => {
  res.status(401).send({
    success: false,
    message: "Google authentication failed",
  });
});

auth.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});

auth.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// auth.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:3000/",
//     failureRedirect: "/google/failure",
//   })
// );

auth.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.redirect(`http://localhost:3000/?login=false`);
      // return res.status(400).send({ message: "User not found" });
    } else {
      const token = jwt.sign(user, "jwt-secret");
      console.log("USEEEER", user);
      res.cookie("token", token);
      res.redirect(`http://localhost:3000/?login=true`);
    }
  })(req, res, next);
});

// auth.post("/login", userLogin);
// auth.post("/register", userRegister);

module.exports = auth;
