const { Router } = require("express");
const modelsRoutes = require("./products.js");
// const { GetShoesByGender } = require("../controllers/products.controller");
const {
  createProduct,
  modifProduct,
  deleteProduct,
} = require("../controllers/CreateProduct");
const {createCategory, getCategory} = require ("../controllers/Category.controller");
const {AddProduct, getWishlist} = require("../controllers/wishlist.controller") 
const {createOrder, getOrder } = require("../controllers/Orders.controllers");

const authRoutes = require("./auth.js");

const router = Router();

//* Routes' middlewares
router.use("/products", modelsRoutes);
router.use("/auth", authRoutes);

// router.get('/models/:gender', GetShoesByGender)
// router.post("/create", createProduct);
// router.put("/details/:id", modifProduct);
// router.delete("/details/:id", deleteProduct);
router.post("/categories", createCategory)
router.get("/categories", getCategory)
router.post("/wishlist", AddProduct);
router.get("/wishlist", getWishlist)
router.get("/Orders", getOrder)
router.post("/Orders", createOrder)

module.exports = router;
