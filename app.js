'use strict'

const express = require('express');
// body-parser: to convert the objects that come to us through the request headers to JSON
const bodyParser = require('body-parser');

const app = express();

// Project routes
const projectRoutes = require('./routes/project');


// ** Middlewares **

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


// Middleware: Configure HEADS and CORS
// When deploying: We define allowed urls or allowed origins instead of '*'
// -res.header('Access-Control-Allow-Origin', '*');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// We add the routes to app
app.use('/api', projectRoutes);

module.exports = app;