const { Router } = require('express');
const modelsRoutes = require("./models.js")



const router = Router();


//* Routes' middlewares
router.use('/products', modelsRoutes )


module.exports = router;
