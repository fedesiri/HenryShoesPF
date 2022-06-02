import User from "../models/User.js";
import bcrypt from "bcryptjs";
import ShoppingCart from "../models/ShoppingCart.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUser = await User.findAll();
    res.send(allUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const oneUser = await User.findByPk(req.params.id, {
      include: {
        model: ShoppingCart,
      },
    });
    res.send(oneUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const editUser = async (req, res) => {
  const {
    name,
    email,
    password,
    lastname,
    city,
    zipcode,
    state,
    address,
    address2,
    roleId,
  } = req.body;
  console.log(req.body);
  try {
    await User.update(
      {
        name: name,
        email: email,
        password: password,
        lastname: lastname,
        address: address ? address : address2,
        roleId: roleId,
        zipcode: zipcode,
        "province/region": state,
        city: city,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const deleteUser = (req, res) => {
  try {
    User.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send({ message: "User has been deleted successfully" });
  } catch (error) {
    return res.send({ message: err }).status(400);
  }
};
