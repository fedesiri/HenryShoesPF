const { Router } = require('express');
const modelsRoutes = require("./products.js")
// const { GetShoesByGender } = require("../controllers/products.controller");



const router = Router();


//* Routes' middlewares
router.use('/products', modelsRoutes )

// router.get('/models/:gender', GetShoesByGender)


module.exports = router;
