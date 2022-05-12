var express = require("express");
const { GetShoesByGender } = require("../controllers/models.controller");


var models = express.Router();

models.get("/models/:gender", GetShoesByGender);

module.exports = models;