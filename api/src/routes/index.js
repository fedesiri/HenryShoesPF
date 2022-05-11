const { Router } = require('express');
const {
    getDetails
} = require("../controllers/details.controller");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/detail', detalles)

router.get("/detail/:id", getDetails);

module.exports = router;