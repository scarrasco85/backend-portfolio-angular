'use strict'

//Cargamos el módulo express necesario para la creación del servidor Express en index.js
var express = require('express');
//Cargamos el módulo body-parser, necesario para convertir los objetos que nos lleguen por
//las cabeceras de las peticiones a JSON y poder trabajar con los datos.
var bodyParser = require('body-parser');

var app = express();

//** Cargamos archivo de Rutas

//** Middlewares - Se ejecuta antes de ejecutar el resultado de una petición
//Middleware necesario para configurar el objeto bodyParser
app.use(bodyParser.urlencoded({extended:false}));
//Middleware que convierte a JSON los datos recibidos de cualquier tipo de petición
app.use(bodyParser.json());


//** CORS

//** Rutas

//** Exportar - Este archivo app.js es un modulo de NodeJS así que lo exportamos en el objeto
//	 app que es dónde hemos cargado toda la configuración necesaria para crear el servidor Express
module.exports = app;
