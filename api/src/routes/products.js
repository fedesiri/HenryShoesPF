var express = require("express");
const {
  getAllProducts,
  getAllBrands,
  GetShoesByGender,
} = require("../controllers/products.controller");
const { getDetails } = require("../controllers/details.controller");


const { ofertSelect, deleteDestacado, deletePromotion } = require("../controllers/ofertSelect.controller");


const { createProduct, modifProduct, deleteProduct } = require("../controllers/CreateProduct");
// const { verifyToken, isAdmin } = require('../middlewares/authJwt.js')


const { getCategory,
  getCategoryId,
  createCategory,
  modifCategory,
  deleteCategory } = require ("../controllers/Category.controller")

 

var products = express.Router();

products.get("/", getAllProducts);
products.get("/brand", getAllBrands);
products.get("/gender/:gender", GetShoesByGender);
products.get("/details/:id", getDetails);

products.post("/create", createProduct);

products.put("/details/:id", modifProduct)
products.delete("/details/:id", deleteProduct)


products.put("/sale", ofertSelect)
products.put("/deletePromotion", deletePromotion)
products.put("/deleteDestacado", deleteDestacado)

// products.post("/create", createProduct)

//categorias 
products.get("/categories", getCategory)
products.get("/categories/:id", getCategoryId)
products.post("/categories", createCategory)
products.put ("/categories/:id", modifCategory)
products.delete("/categories/:id", deleteCategory)



products.post("/ofert", ofertSelect)
products.post("/create", createProduct )

//! Descomentar despues para usar las rutas protegidas con tokens
// products.post("/sale", verifyToken, isAdmin, ofertSelect);
// products.post("/create", verifyToken, isAdmin, createProduct);

module.exports = products;
