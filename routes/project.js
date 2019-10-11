/** Fichero de configuración de las rutas del controlador /controller/project.js **/
'use strict'

//Cargamos el módulo de Express para poder trabajar con las rutas
var express = require('express');
//Cargamos el controlador que hemos creado /controllers/project.js para la entidad Project
var ProjectController = require('../controllers/project');
//Cargamos el método o servicio de Express Router que contiene métodos para trabajar con las rutas
var router = express.Router();


//** Creamos las rutas para el controlador /controllers/project **
//Creamos la ruta /home por el método get al cuál le asignamos el método home: que creado en el controlador
router.get('/home', ProjectController.home);
//Creamos ruta /test por el método post
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);

//Exportamos el nuestro módulo router con toda la configuración de rutas
module.exports = router;