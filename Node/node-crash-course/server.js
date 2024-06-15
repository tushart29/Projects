// creating local server on our laptop which can be used to actively listen and respond to those requests


const http = require("http") // http modul
const fs = require("fs") // module file system 
const _ = require('lodash')

// loadash

const num = _.random(0, 20);
console.log(num)
const greet = _.once(() => {
    console.log("hello");
});

greet()
greet()

// takes in a call back function as a arg. runs everytime a request comes in 
// inside this call back function, we get a req object and res object.
// req object comes with lots of info such as the url , request type such as get or post
// res object used to send resonse back to the user or browser
const server = http.createServer((req, res) => {
    // console.log("request is made"); // would not run on the browser terminal but on our own terminal since its a backend and only runs on our server
    // console.log(req.url, req.method) // EXAMPLE: /about GET
    // formulate response headers. gives us what type of data we are sending back such as text or json. we can set to cookies
    // send a different response based off the url and method
    // contains url 

    // 3 steps . setheader, write, end
    // set header to send back tot browser like what type to send 
    // to send html, change to from text/plain to text/html
    // res.setHeader('Content-Type', "text/html");

    // send data to browser or the response only lines 
    // res.write('<head><link rel="stylesheet" href="#" >Hello,  Ninjas</head>');
    // res.write('<p>Hello,  Ninjas</p>');
    // res.write('<p>Hello again,  Ninjas</p>');

    // end the response and send to back browser. only do this if you do the above like individual writes
    // res.end()


    // express.js helps us with an easier and elagant way . handles all our routes, requests, and responses
    // express is a 3rd party package used in node 
    res.setHeader('Content-Type', "text/html");
    let path = './views/'; // this is where all the html pages 
    switch (req.url) {
        case '/':
            path += 'index.html'
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break;
        case '/about-me-you':
            res.statusCode = 301 // permentely moved or perment redirect 
            res.setHeader('Location', '/about') // 2nd arg is where do we want to redirect
            res.end();
            break;
        default:
            path += '/404.html'
            res.statusCode = 404;

    }


    // send html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end()// end here since your just keeping the request hanging 
        }
        else {
            // res.write(data); if we are sending 1 thing just send data through end(data), if not just do this 
            res.end(data)

        }
        // send / -> index
        // send /about -> about page
        // send any other page to -> 404 page 
    });



}); // creates a server, you dont need to store server but you can use websockets later if you store it


// listens to a request in node.js
server.listen(4000, 'localhost', () => {
    console.log("listening on port 4000")
}) // port number and host name and function which fires when you start listening

/* 

local host is like a domain name on web. takes us to a specific ip address called a loop back ip address . points directly back to our laptop
browser is connecting back on our ocmputer which is acting like a host for our website 
port number numbers are like doors for computers
skype, discord, outlook have different ports so they are separate

status codes: res.status(200);
- 200: everything was okay with the request
- 301: resources is moved to somewhere and is redirected
- 404: not found
- 500: internal server error 

- 100 range  - informational responses
- 200 range - success codes
- 300 range - codes for redirect
- 400 range - user or client errors
- 500 range - server error codes 

npm allows us to install packages, update, remove node packages on our laptop/ individual projects
nodemon helps us reload server lively. instead of canceling everytime we change something in our code, it willl automatically reload for us when we change something 

npx nodemon filename worked 

when we install local dependencies, we it shows up node-modules 
npm and package.json allows us to share project code 

*/