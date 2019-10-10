'use strict'

//Cargamos el módulo express necesario para la creación del servidor Express en index.js
var express = require('express');
//Cargamos el módulo body-parser, necesario para convertir los objetos que nos lleguen por
//las cabeceras de las peticiones a JSON y poder trabajar con los datos.
var bodyParser = require('body-parser');

var app = express();

//** Cargamos archivos de configuración de Rutas de nuestros controladores
//Cargamos archivo de rutas de de la entidad Project en el objeto projectRoutes
var projectRoutes = require('./routes/project');


//** Middlewares - Se ejecuta antes de ejecutar el resultado de una petición
//Middleware necesario para configurar el objeto bodyParser
app.use(bodyParser.urlencoded({extended:false}));
//Middleware que convierte a JSON los datos recibidos de cualquier tipo de petición
app.use(bodyParser.json());


//** CORS

// Añadimos middleware con las Rutas de los archivos de rutas cargados al objeto app
//Añadimos las rutas de la entidad Project, añadiendole el segmento '/api' delante. Ej: /api/home para
//acceder al método home del controlador /controllers/project.js
app.use('/api', projectRoutes);


//** Exportar - Este archivo app.js es un modulo de NodeJS así que lo exportamos en el objeto
//	 app que es dónde hemos cargado toda la configuración necesaria para crear el servidor Express
module.exports = app;
