'use strict'

/** Database connection and Express server creation **/

const mongoose = require('mongoose');
// app Express module
const app = require('./app');
const port = 3700;

// Indicating to mongoose that it is a promise
mongoose.Promise = global.Promise;
// BDD conection
mongoose.connect('mongodb://localhost:27017/portafolio_bd', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conexión a la base de datos establecida satisfactoriamente...");

        // Starting Express server
        app.listen(port, () => {
            console.log("Servidor corriendo correctamente en la url: localhost:3700");
        });
    })
    .catch(err => console.log(err));