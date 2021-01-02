/** Project Controller - Interacts between the Project entity and the database **/
'use strict'

//Project model
const Project = require('../models/project');
//Fyle System Library
const fs = require('fs');
//Path module
const path = require('path');



var controller = {

    home: function(req, res) {
        return res.status(200).send({
            message: "Soy la home"
        });
    },

    test: function(req, res) {
        return res.status(200).send({
            message: "Soy el método o acción test del controlador project"
        });
    },
    //Save project in bdd
    saveProject: function(req, res) {

        let project = new Project();
        let params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;
        project.gitHub = params.gitHub;

        //Save in bdd with mongoose
        project.save((err, projectStored) => {
            //Si devuelve error
            if (err) return res.status(500).send({ message: 'Server error - Failed to save to database' });
            //Si no existe el objeto projectStored
            if (!projectStored) return res.status(404).send({ message: 'Failed to save to database' });

            //The saved project is returned
            return res.status(200).send({ project: projectStored });
        });
    },

    //Get project by ID
    getProject: function(req, res) {
        let projectId = req.params.id;

        if (projectId == null) {
            return res.status(404).send({ message: 'Error, project id is required' });
        }


        //Query the database with mongoose
        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({ message: 'Error returning data, the id format may not be correct' });

            if (!project) return res.status(404).send({ message: 'The project with ID: ' + projectId + ' does not exist' });

            return res.status(200).send({
                project
            });
        });
    },

    //Get all projects
    getProjects: function(req, res) {

        //Query the database with mongoose
        Project.find({}).exec((err, projects) => {

            if (err) return res.status(500).send({ message: 'Server error - Failed to get the information' });

            if (!projects) return res.status(404).send({ message: 'There are no projects to display' });
            //All projects are returned
            return res.status(200).send({ projects });
        });
    },

    //Update project by ID
    updateProject: function(req, res) {

        let projectId = req.params.id;


        //Info to update
        let update = req.body;

        if (projectId == null) {
            return res.status(404).send({ message: 'Error, project id is required' });
        }

        //Query the database with mongoose
        Project.findByIdAndUpdate(projectId, update, { new: true, useFindAndModify: false }, (err, projectUpdated) => {

            if (err) return res.status(500).send({
                message: 'Error updating data, the id format may not be correct'
            });

            if (!projectUpdated) return res.status(404).send({ message: 'Error updating data. The project may not exist in the database' });

            //Data updated is returned
            return res.status(200).send({
                project: projectUpdated
            });
        });

    },

    //Delete project in bdd
    deleteProject: function(req, res) {

        let projectId = req.params.id;


        if (projectId == null) {
            return res.status(404).send({ message: 'Error, project id is required' });
        }

        //Query the database with mongoose
        Project.findByIdAndRemove(projectId, (err, projectDeleted) => {

            if (err) return res.status(500).send({ message: 'Error deleting data, the id format may not be correct' });

            if (!projectDeleted) return res.status(404).send({ message: 'Error deleting data. The project may not exist in the database' });

            //Return data deleted
            return res.status(200).send({
                project: projectDeleted
            });
        });
    },

    //Updates the image property of a project. It is called when uploading an image to the server in the post request
    uploadImage: function(req, res) {


        if (req.files) {
            let projectId = req.params.id;
            let filePath = req.files.image.path;

            let fileNameSplit = filePath.split('/');
            let fileName = fileNameSplit[2];

            let extSplit = fileName.split('\.');
            let fileExt = extSplit[1];


            if (projectId == null) {

                //If no project id was provided. It is necessary to delete the image from the folder because it is uploaded 
                //automatically when executing the POST request. We use the unlink () function from the FyleSystem library
                fs.unlink(filePath, (err) => {
                    res.status(404).send({ message: "Error, project id is required" });
                });

            } else {

                if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {

                    //Query database with mongoose
                    Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {

                        if (err) {

                            fs.unlink(filePath, (err) => {
                                if (err) res.status(500).send({ error: err });
                            });
                            return res.status(500).send({ message: "Image upload error. The provided project id format may be wrong" });
                        }

                        if (!projectUpdated) {
                            fs.unlink(filePath, (err) => {
                                if (err) res.status(404).send({ error: err });
                            });
                            return res.status(404).send({ message: "Image upload error. The project may not exist in the database" });
                        }

                        //Updated data is returned
                        return res.status(200).send({
                            project: projectUpdated
                        });

                    });

                } else {
                    //If the file is not an image we delete it from the server folder
                    fs.unlink(filePath, (err) => {
                        res.status(200).send({ message: "The file format is not accepted" });
                    });
                }
            }

        }

    },

    //Gets the path of a project image
    getImageProject: function(req, res) {

        let file = req.params.image;

        let pathFile = './uploads/img/' + file;


        fs.exists(pathFile, (exists) => {
            if (exists) {

                return res.sendFile(path.resolve(pathFile));
            } else {
                return res.status(500).send({
                    message: "The image no exist"
                });
            }
        });

    }
};

module.exports = controller;