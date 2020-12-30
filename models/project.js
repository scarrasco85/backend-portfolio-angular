'use strict'

/** Entity Project Model **/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Project Schema
const ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String,
    gitHub: String
});

module.exports = mongoose.model('Project', ProjectSchema);