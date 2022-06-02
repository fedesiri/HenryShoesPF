import Orders from "../models/Orders.js";
import ShoppingCart from "../models/ShoppingCart.js";

export const getShoppingCart = async (req, res) => {
  const email = req.body.email;

  try {
    const selectedCart = await ShoppingCart.findAll({
      where: {
        email: email,
        statusOpen: true
      },
      include: {
        model: Orders,
        attributes: ["sizeId", "productId", "quantity"],
      },
    });

    res.status(200).send(selectedCart);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

export const getShoppingHistory = async (req, res) => {
  const email = req.body.email;
  console.log(req.body)

  try {
    const selectedCart = await ShoppingCart.findAll({
      where: {
        email: email,
        statusOpen: false
      },
      include: {
        model: Orders,
        attributes: ["sizeId", "productId", "quantity", "price"],
      },
    });

    res.status(200).send(selectedCart);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

export const getAllShoppingHistory = async (req, res) => {

  try {
    const selectedCart = await ShoppingCart.findAll({
      where: {
        statusOpen: false
      },
      include: {
        model: Orders,
        attributes: ["sizeId", "productId", "quantity", "price"],
      },
    });

    res.status(200).send(selectedCart);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

export const removeFromCart = async (req, res) => {
  const { id, sizes, email } = req.body;
  console.log("deleteeeeeeee", req.body)

  try {
    const selectedCart = await ShoppingCart.findOne({
      where: {
        email: email,
        statusOpen: true
      }
    });
    const selectedOrder = await Orders.findOne({
      where: {
        productId: id,
        sizeId: sizes,
      }
    });

    const removedOrder = await selectedCart.removeOrders(selectedOrder);

    res.send("The product has been removed from the Cart")
  } catch (err) {
    console.log(err)
    res.send(err)
  }
};