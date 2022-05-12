const { Router } = require('express');
const modelsRoutes = require("./products.js")



const router = Router();


//* Routes' middlewares
router.use('/products', modelsRoutes )


module.exports = router;
