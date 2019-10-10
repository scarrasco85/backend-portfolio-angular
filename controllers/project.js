/** Controlador de la entidad Project encargada de guardar información en la colección projects
    de la base de datos **/
'use strict'

//Cargamos-importamos el modelo Project
var Project = require('../models/project');


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
	},

	//Método que guarda un elemento de proyecto en la base de datos
	saveProject: function(req, res){
		let project = new Project();

		//recogemos los parámetros que nos llegan por el body(post) de la petición
		let params = req.body;
		//Asignamos los datos recibidos a cada una de las propiedades del objto project
		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.year = params.year;
		project.langs = params.langs;
		project.image = null;

		//Médoto que guarda un proyecto en la base de datos
		//Usamos el método .save de mongoose, el cuál está cargado en el esquema del modelo Project(/models/project.js)
		//Función de callback que devuelve un error o el objeto guardado(a projectStored podemos llamarlo proyecto guardado o como queramos)
		project.save((err, projectStored) => {
			//Si devuelve error
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});
			//Si no existe el objeto projectStored
			if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});
			//Si todo ha ido bien devolvemos el objeto guardado dentro de una propiedad project, si no indicamos la propiedad
			//devolvería el objeto dentro de una propiedad con el mismo nombre, es decir, projectStored
			return res.status(200).send({project: projectStored});
		});

		
	}
};


//exportamos nuestro módulo(controlador) para poder usarlo con un require('controller')
module.exports = controller;