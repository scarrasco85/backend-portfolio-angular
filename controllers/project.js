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
	},

	//Método que devuelve un documento de la base de datos según su id
	getProject: function(req, res){
		var projectId = req.params.id;

		//Controlamos si se ha pasado el parámetro id por la ruta ya que lo hemos definido opcional
		if(projectId == null){
			return res.status(404).send({message: 'No has concretado el id del proyecto a consultar.'});
		} 
		

		//Con el método .findById de mongoose recuperamos la información del proyecto a buscar
		Project.findById(projectId, (err, project) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos, es posible que el formato del id no sea correcto'});

			if(!project) return res.status(404).send({message: 'El proyecto con id='+projectId+' no existe.'});

			return res.status(200).send({
				project
			});
		});
	},

	//Método que devuelve todos los proyectos que hay en la colección projects de nuestra base de datos portafolio_bd
	getProjects: function(req, res){

		//Usamos el método .find() de mongoose para conseguir todos los proyectos. Más información: https://mongoosejs.com/docs/api.html#model_Model.find
		Project.find({}).exec((err, projects) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos'});

			if(!projects) return res.status(404).send({message: 'No hay proyectos para mostrar'});
			//Si todo ha ido bien devolvemos un array de objetos JSON con todos los proyectos
			return res.status(200).send({projects});
		});
	}
};


//exportamos nuestro módulo(controlador) para poder usarlo con un require('controller')
module.exports = controller;