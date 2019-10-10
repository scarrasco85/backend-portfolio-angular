/** Controlador de la entidad Project encargada de guardar información en la colección projects
    de la base de datos **/

'use strict'

//Creamos el controlador en un objeto JSON directamente con todas las funciones o métodos. 
//También podríamos usar métodos separados que devuelvan un objeto JSON. 
var controller = {

	home: function(req, res){
		return res.status(200).send({
			message: "Soy la home"
		});
	},

	test: function(req, res){
		return res.status(200).send({
			message: "Soy el método o acción test del controlador project"
		});
	}
};


//exportamos nuestro módulo(controlador) para poder usarlo con un require('controller')
module.exports = controller;