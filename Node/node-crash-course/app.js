// this is in express
const express = require('express') // returns a function


const morgan = require('morgan')

const mongoose = require('mongoose')

const Blog = require('./models/blog')
// express app
const app = express() // invoking a express function and creating an app

// connect to mongodb 
const dbURI = 'mongodb+srv://netninja:test1234@tusharcluster.inz6d8q.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=tusharcluster'
mongoose.connect(dbURI)
    .then((result) => {
        // listen for requests
        app.listen(4000); // only listens to requests if connected to database.
        console.log('connected to database')
    }) // 2nd arg is an option argument to stop warnings, async task which returns promise
    .catch((err) => {
        console.log('not connected')
    })

// using mongoose to interact with database. 



// register view engine
app.set('view engine', 'ejs') // ejs will be used to create templates 
// if you want to create a different folder
// app.set('views','myviews') // old folder to new folder



// middlewhere for static files like images and css
app.use(express.static('public')) // pass in public folder and anything inside this folder will be avaliable 

// takes in all url encoded data and passes into an object which we can use in req object 
app.use(express.urlencoded({ extended: true })) // accpets form data


app.use(morgan('dev')) // dictates how it will be formated of what will be printed on console 
// example output: GET / 304 16.258 ms - -

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: "New Blog 2",
        snippet: "about my new blog 2",
        body: "more about new blog2  "
    }); // using the model to create a new instance within the code

    // save is a async task which takes time so returns a promise 
    blog.save()  // saves to database. mongoose used the blog model, therefore going to look for blogs collection based off this name, and take this doc above and save to blogs collections
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })

})


app.get('/single-blog', (req, res) => {
    Blog.findById('6666122473e1c4e214098c8d') // gets all documents inside the blog collection. it is async so returns a promise
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/all-blogs', (req, res) => {
    Blog.find() // gets all documents inside the blog collection. it is async so returns a promise
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

// next function will be accessed through params
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     // has to move on to the next middlewhere
//     next() // invoked next method 
// });

// app.use((req, res, next) => {
//     console.log('in the next middlewhere');


//     next() // invoked next method 
//     // after this, will try to match any of the get or any other middlewhere methods 

// });

// takes in 2 args. 1 is what path or url you want to listen . 2nd is function that takes in a request and res object so we can do something with those.
// contains info about req with url or method of request. res which we can use to send a response to browser 
app.get('/', (req, res) => {
    // instead of res.write and res.end(), res.send(). this infers type of content to send to the browser and automatically sets the content type header like in server.js
    // also infers status code like 200 if we send a html
    // res.send('<p>Hello,  Ninjas</p>');
    // res.sendFile('./views/index.html', { root: __dirname }) // 2nd arg tells what the root should be . dirname gets the current directory of this file. from there it can be relative path 

    // we want to render a view instead of a html file
    // res.render('index')
    // const blogs = [
    //     { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    // ];
    // res.render('index', { title: 'Home', blogs: blogs }); // will be taken to index.ejs. there you can use these params
    res.redirect('/blogs')

})

app.get('/about', (req, res) => {

    // res.sendFile('./views/about.html', { root: __dirname })
    // res.render('about')
    res.render('about', { title: 'About' });
})

// redirects
// app.get('/about-us', (req, res) => {
//     // res.redirect('/about') // express sends req to browser and creates a new request for /about and automtically assingets status code 
// })


// blog routes

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // makes it so newest will be on the top 
        .then((result) => {
            // when we get all the array of blogs from the database. index.ejs expects a property called blobs. pass it as a property
            res.render('index', { title: 'All Blogs', blogs: result }) // title is in the head where we output the title
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post('/blogs', (req, res) => {
    // middlwhere will be used to pass the data into a format which will be attached into req object. 
    // middlewhere: app.use(express.urlencoded({ extended: true }))
    // without above, it wont work like getting the data from the user
    // this function will save to database
    // console.log(req.body)
    const blog = new Blog(req.body)
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/:id', (req, res) => {
    // find single doc from id from database. get id from req object
    const id = req.params.id; // if instead of tushar in url you would say tushar in there
    console.log(id);
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch((err) => {
            console.log(err);
        })

})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)

        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err);
        })

})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});
// 404 page
// create middlewhere and fire middlewhere functions in express
// fires a call back function and this ufnction has access to req and res
// use function fires every single fucntion and only if request reaches to this part of the code from top to bottom.
// if the url is not matched from the above this call back will be called
// if one fires, the other functions wont fire even if they match since the previous already matched 
// use method is baically use this function every incoming request regradless of the url 
// must always go at the bottom
// will run if none of those match above like the url 
// if placed at the top, this will be fired all the time since after rendered/sent, code below wont get executed
app.use((req, res) => {

    // res.status(404).sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404', { title: '404' });
})

// to show user data or dynamic data, in templates, we can use view engine or tempalte enginre where express apps can be used
// view engines allows us to inject dymaic data and serve that html page to the browser 
// we can use express handler bars, pug, ejs (will be using)


// ejs files live on the server. when we want to render, these files are passed through ejs engine and looks for dynamic content, when it find those
// it finds those resulting html fiel and we get those results and will be returned to the browser. this is called server side rendering



/*
MIDDLEWHERE
middlewhere is something that runs on the server between getting a request and sending a response
The use method is used in this middlewhere and is used here like the 404 case.
we can have more than 1 piece of middlewhere that runs on server. we can have like 3 funcitons of use before a response is sent
functions that run in our get handlers, they are also middlewhere. get handler only fires get requests to certain routes
use methods run on all routes including post requests
middlewhere runs top to bottom until we exit the progress and we explicity exit out the code
when a response it sent, nothing below gets executed 

we can log details on every request to the server, authentication check middlewhere for protected routes, middlewhere
to parse JSON data from requests, return 404 pages



collections - table
blog collection - contains 1 type of document 
blog doc - id, tittle, snippet, body 
collection - load of docs of a certain type 


REQUEST TYPES
- get requests to get a resource
- post requests to create a new data( new blog)
- delete requests to delete data (delete a blog)
- put requests to update data (update a blog)


mongoose- ODM library ( object document mapping library)
queries correct data based off the model we use.
User Model: user.get(), user.findbyid()


schema: structure of the database with property type and properties
blog schema: string title, string snippet, string body are all required
user schema: string name, int age, string bio all required

create a model based off the schema -- allows us to interact with data
blog model can get, save, delete data from the database

to start app: npx nodemon app 

https://www.youtube.com/watch?v=VVGgacjzc2Y&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=10

route params: variable part of the route that can change.
localhost:4000/blogs/:id
localhost:4000/blogs/:12345


if we click specfic blog, we click delete, delete requests to the server. than deletes the blog with that id.


MVC:
 model, view, controller -> makes the code cleaner and modular 

 vies: html tempalte
 models: describtionp of data structure to interact with database
 controllers: forms link between views and models 


*/