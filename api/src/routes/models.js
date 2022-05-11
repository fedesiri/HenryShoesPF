var express = require("express");
const { getAllModels, getAllModelsByBrand } = require("../controllers/models.controller");


var models = express.Router();

models.get("/", getAllModels);

models.get("/brand/:id", getAllModelsByBrand);

module.exports = models;