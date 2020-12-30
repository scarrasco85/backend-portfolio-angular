/** Routes configuration file **/
'use strict'

const express = require('express');
// ProjectController
const ProjectController = require('../controllers/project');
// Express Router
const router = express.Router();
// connect-multiparty: To work with files
const multipart = require('connect-multiparty');
// Middleware: to define where the files will be uploaded
const multipartMiddleware = multipart({ uploadDir: './uploads/img' });


// Projects Routes
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/get-projects', ProjectController.getProjects);
router.put('/update-project/:id?', ProjectController.updateProject);
router.delete('/delete-project/:id?', ProjectController.deleteProject);
// The middleware is applied where the images will be uploaded
router.post('/upload-image/:id?', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageProject);

module.exports = router;