import express from "express";
import User from "../models/User.js";
import ShoppingCart from "../models/ShoppingCart.js";
import {
  createUserTokenService,
  getUserService,
  matchUserPasswordService,
  createRefreshTokenService,
} from "../services/signin.services.js";
import jwt from "jsonwebtoken";
import { transporter } from "../config/mailer.js";
import dotenv from "dotenv";
dotenv.config();

//*funciona
export const signInController = async (req, res) => {
  // console.log("SOYYY req.body", req.body.password);
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    // console.log(user)
    if (!user) {
      return res.status(400).send({ message: "Email doesn't exist." });
    }
    const passwordMatch = await matchUserPasswordService(
      req.body.password,
      user.password
    );
    console.log(passwordMatch, "MATCHEO");
    if (!passwordMatch) {
      res.status(400).send({ message: "Incorrect password" });
      return;
    } else {
      const token = createUserTokenService(user);
      if (!token) return res.send({ message: "Error creating token" });

      const refreshToken = createRefreshTokenService(user);
      if (!refreshToken)
        return res
          .status(400)
          .send({ message: "Error creating refresh token" });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      const Cart = await ShoppingCart.findOne({
        where: {
          email: req.body.email,
        },
      });
      res.status(200).send({
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        roleId: user.roleId,
        ShoppingCart: Cart,
      });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const sigInGoogleFailureController = (req, res) => {
  return res.status(400).redirect("http://localhost:3000/error/login");
};
export const sigInGoogleSuccessController = (req, res) => {
  return res.status(400).redirect("http://localhost:3000/signin/success");
};

export const sigInCallbackController = async (req, res) => {
  // console.log("req.user", req);
  const email = req.user?._json?.email;
  try {
    const user = await getUserService(email);
    const token = createUserTokenService(user);
    if (!token)
      return res.status(400).send({ message: "Error creating token" });
    console.log(token);
    return res
      .status(200)
      .send({ message: "User logged in successfully", data: token });
  } catch (error) {
    return res.status(400).send({ message: "Error logging in user", error });
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  // console.log(email);

  if (!email) {
    return res.status(400).send({
      message: "Please provide email",
    });
  }

  const message = "Please check your email for password reset link";
  var verificationLink;
  var emailStatus = "ok";

  try {
    var user = await User.findOne({ where: { email: email } });
    var token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET_RESET,
      { expiresIn: "15m" }
    );
    //! TODO: CAMBIAR A PROCESS.ENV
    verificationLink = `http://localhost:3000/reset-password/${token}`;
    user.resetToken = token;
    await user.save();
  } catch (error) {
    return res.send({ message: "Please, check your email" });
  }

  //!TODO: send email
  try {
    await transporter.sendMail({
      from: '"Forgot password" <store.henry.shoes@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Forgot password", // Subject line
      html: `
      <b>Hi ${user.name}</b>
        <p>You have requested to reset your password</p>
        <p>Please click on the link below to reset your password</p>
        <a href="${verificationLink}">${verificationLink}</a>
      `, // html body
    });
  } catch (error) {
    emailStatus = "error";
    return res.status(400).send({ message: "Error sending email" });
  }

  res.status(200).send({ message, info: emailStatus });
};

export const createNewPassword = async (req, res, next) => {
  const { newPassword } = req.body;
  console.log(newPassword, "NUEVA PASSWORD");
  //! front debe enviarnos el token
  const resetToken = req.headers.reset;
  console.log(req.headers);
  console.log(resetToken, "TOKEN");

  if (!(newPassword && resetToken)) {
    return res.status(400).send({ message: "All fields are required" });
  }

  var jwtPayload;
  try {
    jwtPayload = jwt.verify(resetToken, process.env.JWT_SECRET_RESET);
    var user = await User.findOne({ where: { resetToken: resetToken } });
  } catch (error) {
    return res.status(401).json({ message: "Something went wrong" });
  }
  if (newPassword) {
    user.password = newPassword;
    await user.save();
    res.status(200).send({ message: "Password updated successfully" });
  } else {
    res.status(400).send({ message: "Password is required" });
  }
}; 
