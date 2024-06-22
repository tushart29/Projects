// creates bunch of functions to so we can reference them in the routes file

const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')


// functions 

// get all workouts

const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: - 1 }) // can pass a argument like reps:20 to find all docs with this 
    res.status(200).json(workouts);

}



// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findById(id)
    // if workout does not exist you 
    if (!workout) {
        // basically error check 
        return res.status(404).json({ error: 'No such workout' })
        // you have to return so you dont want to carry all the code below 
    }

    res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    // add doc to db
    try {
        // create is a async function so change the router.pos to be async , then use await
        // creates a new document 
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json({ workout })

    } catch (error) {

        res.status(400).json({ error })
    }
    // res.json({ message: 'POST a new workout' })
}



// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })
    // if workout does not exist you 
    if (!workout) {
        // basically error check 
        return res.status(404).json({ error: 'No such workout' })
        // you have to return so you dont want to carry all the code below 
    }

    res.status(200).json(workout)
}



// update a workout 
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        // whatevery properties in req.body will be updated to workou
        ...req.body
    })
    // if workout does not exist you 
    if (!workout) {
        // basically error check 
        return res.status(404).json({ error: 'No such workout' })
        // you have to return so you dont want to carry all the code below 
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}