var express = require("express");
const { getAllProducts, getAllBrands, GetShoesByGender } = require("../controllers/products.controller");
const { getDetails } = require("../controllers/details.controller");
const { ofertSelect, deleteDestacado, deletePromotion } = require("../controllers/ofertSelect.controller");
const { createProduct, modifProduct, deleteProduct } = require("../controllers/CreateProduct");
// const {verifyToken, isAdmin} = require('../middlewares/authJwt.js')

var products = express.Router();

products.get("/", getAllProducts);
products.get("/brand", getAllBrands);
products.get("/gender/:gender", GetShoesByGender);
products.get("/details/:id", getDetails);

products.post("/create", createProduct);
products.put("/details/:id", modifProduct)
products.delete("/details/:id", deleteProduct)


products.put("/ofert", ofertSelect)
products.put("/deletePromotion", deletePromotion)
products.put("/deleteDestacado", deleteDestacado)

products.post("/create", createProduct)



//! Descomentar despues para usar las rutas protegidas con tokens
// products.post("/ofert", verifyToken, isAdmin, ofertSelect)
// products.post("/create", verifyToken, isAdmin, createProduct );



module.exports = products;