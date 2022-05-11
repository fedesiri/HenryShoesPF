var express = require("express");

const { getAllModels, getAllBrands, getAllModelsByBrand, getDetails } = require("../controllers/models.controller");

var models = express.Router();

models.get("/", getAllModels);
models.get("/brand", getAllBrands);
models.get("/brand/:id", getAllModelsByBrand);
models.get("/details/:id", getDetails);
module.exports = models;