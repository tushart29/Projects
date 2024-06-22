// entry file for backend, and register express api

// require the env file
// attaches to process object 
require('dotenv').config()





const express = require('express')
const app = express() // creates a express app which we invoked 

// mongoose
const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workouts')






// middleware
// any requests it comes, looks for any data we are sending to server. if it does, it attaches to the req body
app.use(express.json())

// fires every request we get
// req, res, next: have to run at the end to move on to the next piece of middleware
// if we get request to / then this runs first, without next, it wont go to the next pience of route
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


app.use('/api/workouts', workoutRoutes) // grabs all different routes in workouts folder
// /api/workouts/ will be fired in workroutes. if /api/workouts/hello, then this function will be fired in that file
// use this workout routes when they go to this specfic route 

// connect to db
mongoose.connect(process.env.MONG_URI) // async and takes a little bit of time to do 
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port!!!!!', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })


// routes
// root of the website
// req object to get information of request, res to send response to browser
// example of middlewhere
// app.get('/', (req, res) => {
//     res.json({ message: "Welcome to the App" })
// })


// listens for requests through certain port number
// app.listen(process.env.PORT, () => {
//     console.log('listening on port!!!!!', process.env.PORT)
// })

