const { Products, User } = require("../db.js");

const AddProduct = async (req, res) => {
  const { productId, userName } = req.body;
  try {
    const addedProduct = await Products.findOne({
      where: {
        id: productId,
      },
    });
    const userWishlist = await User.findOne({
      where: {
        username: userName,
      },
    });
    userWishlist.addProduct(addedProduct);
    res.send(userWishlist);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getWishlist = async (req, res) => {
  const { userName } = req.body;
  try {
    const wishlist = await User.findOne({
      where: {
        username: userName,
      },
      include: {
        model: Products,
        attributes: ["model"],
      },
    });
    res.send(wishlist);
  } catch (err) {
    res.status(404).send({message: "Wishlist is empty."});
  }
};

module.exports = {
  AddProduct,
  getWishlist,
};
