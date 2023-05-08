const { Router } = require('express');
const countriesRouter = require("./countriesRouter");
const activitiesRouter = require("./activitiesRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router(); //!tiene la responsabilidad de definir las rutas


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/country", countriesRouter);
router.use("/activity", activitiesRouter);


module.exports = router;
