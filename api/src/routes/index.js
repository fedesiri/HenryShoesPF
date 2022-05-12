const { Router } = require('express');
const modelsRoutes = require("./models.js")
const { GetShoesByGender } = require("../controllers/models.controller");



const router = Router();


//* Routes' middlewares
router.use('/models', modelsRoutes )

router.get('/models/:gender', GetShoesByGender)


module.exports = router;
