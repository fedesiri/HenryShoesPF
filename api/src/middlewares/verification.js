import express from "express";
import User from "../models/User.js";

//*funciona
const verifyEmail = async (req, res, next) => {
  // console.log("req.body", req.body);
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    // console.log("user", user);
    if (user) {
      next();
    } else {
      console.log("User not verified");
    }
  } catch (error) {
    console.log(error);
  }
};

export default verifyEmail;