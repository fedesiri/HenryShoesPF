var express = require("express");
const { getAllProducts, getAllBrands, GetShoesByGender } = require("../controllers/products.controller");
const { getDetails } = require("../controllers/details.controller");

const { ofertSelect } = require("../controllers/ofertSelect.controller");


const { createProduct } = require("../controllers/CreateProduct");


var products = express.Router();

products.get("/", getAllProducts);
products.get("/brand", getAllBrands);
products.get("/gender/:gender", GetShoesByGender);
products.get("/details/:id", getDetails);

products.post("/create", createProduct );


products.post("/ofert", ofertSelect)



module.exports = products;