const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config()


connectDb()
const app = express(); // creates express server

// npm run dev to start server 

// const port = 4000; // static server
// to test api, we need a http client we will use thunder client similar to postman 

const port = process.env.PORT || 4000

app.use(express.json())
app.use('/api/contacts', require('./routes/contactRoutes')) // adding middlewhere in the express project
app.use('/api/users', require('./routes/userRoutes')) // adding middlewhere in the express project

app.use(errorHandler)

// whenever we want to use middlwhere, use app.use

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// auth module
// provide endpoints to register themselves, once they login they use access token, and they can manage their contacts