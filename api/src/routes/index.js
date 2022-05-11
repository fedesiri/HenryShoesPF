const { Router } = require('express');
const detailsRoutes = require("./details.js")


const router = Router();




router.use("/detail", detailsRoutes);

module.exports = router;