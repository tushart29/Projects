
// this is our schema which definefs the strucutre of our database
// model is where we apply this schema, and we use this model to interact with that collection 
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true });


// creates a model to interact with workout collection and automatically builds this collection for us
module.exports = mongoose.model('Workout', workoutSchema)



