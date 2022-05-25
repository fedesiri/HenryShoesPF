import Orders from "../models/Orders.js";
import ShoppingCart from "../models/ShoppingCart.js";

export const getShoppingCart = async (req, res) => {
  const email = req.body.email;

  try {
    const selectedCart = await ShoppingCart.findAll({
      where: {
        email: email,
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
