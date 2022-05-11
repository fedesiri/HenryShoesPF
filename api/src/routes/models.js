var express = require("express");
const { getAllModels, getAllBrands } = require("../controllers/models.controller");


var models = express.Router();

models.get("/", getAllModels);
models.get("/brand", getAllBrands);

module.exports = models;