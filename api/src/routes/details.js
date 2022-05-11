var express = require("express");

const {
    getDetails
} = require("../controllers/details.controller");


var detail = express.Router();

detail.get("/:id", getDetails);

module.exports = detail;