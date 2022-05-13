var express = require("express");
const { getAllProducts, getAllBrands, GetShoesByGender } = require("../controllers/products.controller");
const { getDetails } = require("../controllers/details.controller");
const { createProduct } = require("../controllers/CreateProduct");

var products = express.Router();

products.get("/", getAllProducts);
products.get("/brand", getAllBrands);
products.get("/gender/:gender", GetShoesByGender);
products.get("/details/:id", getDetails);
products.post("/", createProduct );


module.exports = products;