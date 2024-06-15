const mongoose = require('mongoose');
const Schema = mongoose.Schema; // constructor funciton to create a new schema

// describes strucutre of the blogs 
const blogSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    snippet: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    }
}, { timestamps: true }) // options object is the second parm, createa  blog doc with timestamps automatically 

const Blog = mongoose.model('Blog', blogSchema) // 1st arg: name of the model to communicate with database, 2nd arg is schema name

module.exports = Blog