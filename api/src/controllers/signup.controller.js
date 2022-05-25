import express from "express";
import { signUpService } from "../services/signup.services.js";
//*FUNCIONA
export const signupController = async (req, res) => {
  const { name, email, password, lastname, role } = req.body;
  // console.log("SOOY req.bodyyy",req.body)
  if (!name || !email ||  !password || !lastname)
    return res.status(400).send("Please fill all the fields");
  try {
    const newUser = await signUpService(req);
    // console.log(newUser)
    if (!newUser) return res.status(400).send("User already exists");
    return res.status(200).send(newUser);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  } 
};
