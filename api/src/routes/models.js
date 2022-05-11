var express = require("express");
const { getAllModels } = require("../controllers/models.controller");


var models = express.Router();

models.get("/", getAllModels);

module.exports = models;