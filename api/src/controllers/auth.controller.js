const { User, Role } = require("../db.js");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const { generateToken, comparePassword } = require("../middlewares/authJwt.js");

const userRegister = expressAsyncHandler(async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      address: req.body.address,
      role: req.body.role,
    });
    if (req.body.role === "admin") {
      const roleUser = await Role.findOne({
        where: {
          name: "admin",
        },
      });
      // console.log(roleUser);
      await roleUser.addUser(newUser);
    } else {
      const roleUser = await Role.findOne({
        where: {
          name: "user",
        },
      });
      await roleUser.addUser(newUser);
    }
    // console.log(newUser);
    res.send({
      id: newUser.id,
      name: newUser.name,
      lastname: newUser.lastname,
      username: newUser.username,
      email: newUser.email,
      address: newUser.address,
      token: generateToken(newUser),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const userLogin = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: {
          [Op.eq]: req.body.email,
        },
      },
    });
    // console.log(user);
    if (!user) return res.status(400).send({ message: "Email does not exist" });

    const passwordMatch = comparePassword(req.body.password, user.password);
    if (!passwordMatch)
      return res.status(401).send({ message: "Password is incorrect" });
    const token = generateToken(user);
    // console.log(user)
    res.send({ token: token, user: user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = {
  userRegister,
  userLogin,
};
