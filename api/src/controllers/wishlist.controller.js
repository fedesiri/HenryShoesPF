import User from "../models/User.js";
import Products from "../models/Products.js";

export const AddProduct = async (req, res) => {
  const { productId, email } = req.body;
  // console.log(req.body)
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
  // console.log("ver", email)

  try {
    const wishlist = await User.findOne({
      where: {
        email: email,
      },
      include: {
        model: Products,
        image: Products,
        id: Products,
        attributes: ["model", "image", "id"],
      },
    });
    // console.log("verqonda", wishlist.dataValues.products)
    res.send(wishlist);
  } catch (err) {
    res.status(404).send({ message: "Wishlist is empty." });
  }
};

export const removeFromWishlist = async (req, res) => {
  const { productId, email } = req.body;
  console.log("deleteeeeeeee", req.body)

  try {
    const selectedUser = await User.findOne({
      where: {
        email: email
      }
    });

    const selectedProd = await Products.findOne({
      where: {
        id: productId
      }
    });

    const removedProd = await selectedUser.removeProducts(selectedProd);

    res.send("The product has been removed from the wishlist")
  } catch (err) {
    console.log(err)
    res.send(err)
  }
};