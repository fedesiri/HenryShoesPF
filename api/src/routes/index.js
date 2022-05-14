const { Router } = require('express');
const modelsRoutes = require("./products.js")
// const { GetShoesByGender } = require("../controllers/products.controller");
const {createProduct} = require("../controllers/CreateProduct")

const authRoutes = require('./auth.js')




const router = Router();


//* Routes' middlewares
router.use('/products', modelsRoutes )
router.use('/auth', authRoutes)

// router.get('/models/:gender', GetShoesByGender)
router.post("/create", createProduct );

module.exports = router;
