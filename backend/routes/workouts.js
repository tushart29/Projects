const express = require('express')

const Workout = require('../models/WorkoutModel')
const router = express.Router() // creates a instance of router 

const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout

} = require('../controllers/workoutController')
// All of tehse are API endpoints 
// GET ALL WORKOUTS
// router.get('/', (req, res) => {
//     res.json({ message: 'Get all Workouts' })
// })
router.get('/', getWorkouts)

// GET A SINGLE WORKOUT
router.get('/:id', getWorkout)

// POST A NEW WORKOUT
// example of a handler 
// when we send a post, we send data (title, reps, load) to database 
// we used middlewhere like below all of the req body will be passed to req object 
// app.use(express.json())
router.post('/', createWorkout)

// DELETE A NEW WORKOUT 
router.delete('/:id', deleteWorkout)

// UPDATE A NEW WORKOUT
router.patch('/:id', updateWorkout)







module.exports = router