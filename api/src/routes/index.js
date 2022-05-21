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
router.get("/ShoppingCart", getShoppingCart)


module.exports = router;
