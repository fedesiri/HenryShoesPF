const { Router } = require('express');
const modelsRoutes = require("./products.js")
// const { GetShoesByGender } = require("../controllers/products.controller");
const { createProduct } = require("../controllers/CreateProduct");



const router = Router();


//* Routes' middlewares
router.use('/products', modelsRoutes )

// router.get('/models/:gender', GetShoesByGender)
router.post("/create", createProduct );


module.exports = router;
