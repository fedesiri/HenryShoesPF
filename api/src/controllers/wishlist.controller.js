import User from "../models/User.js";
import Products from "../models/Products.js";

export const AddProduct = async (req, res) => {
  const { productId, email } = req.body;
  try {
    const addedProduct = await Products.findOne({
      where: {
        id: productId,
      },
    });
    const userWishlist = await User.findOne({
      where: {
        email: email,
      },
    });
    userWishlist.addProduct(addedProduct);
    res.send(userWishlist);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getWishlist = async (req, res) => {
  const { email } = req.body;
  try {
    const wishlist = await User.findOne({
      where: {
        email: email,
      },
      include: {
        model: Products,
        attributes: ["model"],
      },
    });
    res.send(wishlist);
  } catch (err) {
    res.status(404).send({ message: "Wishlist is empty." });
  }
};
