const { Router } = require("express");
const modelsRoutes = require("./products.js");
const passport = require("passport");
const {
  createProduct,
  modifProduct,
  deleteProduct,
} = require("../controllers/CreateProduct");
const {createCategory, getCategory} = require ("../controllers/Category.controller");
const {AddProduct, getWishlist} = require("../controllers/wishlist.controller") 
const {createOrder, getOrder, getStock } = require("../controllers/Orders.controllers");
const {getShoppingCart} = require("../controllers/ShoppingCart");
require("../middlewares/google.js");
const {generateToken} = require("../middlewares/authJwt.js")
const authRoutes = require("./auth.js");

const router = Router();

//* Routes' middlewares
router.use("/products", modelsRoutes);
router.use("/auth", authRoutes);


router.post("/categories", createCategory)
router.get("/categories", getCategory)
router.post("/wishlist", AddProduct);
router.get("/wishlist", getWishlist)
router.get("/Orders", getOrder)
router.get("/Stock", getStock)
router.post("/Orders", createOrder)
router.get("/ShoppingCart", getShoppingCart);
router.post("/register", (req, res, next) => {
  passport.authenticate("local-register", (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).send({ message: "User already exists" });
    } else {
      const token = generateToken(user)
      return res.status(201).send({user, token});
    }
  })(req, res, next);
});


module.exports = router;
