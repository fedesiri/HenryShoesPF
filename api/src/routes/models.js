var express = require("express");

const { getAllModels, getAllBrands, getAllModelsByBrand } = require("../controllers/models.controller");
const { getDetails } = require("../controllers/details.controller");
var models = express.Router();

models.get("/", getAllModels);
models.get("/brand", getAllBrands);
models.get("/brand/:id", getAllModelsByBrand);
models.get("/details/:id", getDetails);
module.exports = models;