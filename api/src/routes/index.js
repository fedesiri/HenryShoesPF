const { Router } = require('express');
const modelsRoutes = require("./models.js")



const router = Router();


//* Routes' middlewares
router.use('/models', modelsRoutes )


module.exports = router;
