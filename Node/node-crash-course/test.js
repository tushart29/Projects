// console.log("mario")

// const greet = (name) => {
//     console.log(name);
// }

// greet("name")




// global Object
/*

- like when you type window in the browser console like inspect
- you get window object and the methods avaliable inside the browser
- when you print global, these methods are avaliable to us in node.js
- these type of methods like setTimeout are just avalible to use so dont need to do like global.setTimeout. just do setTimeout()
console.log(global)

runs this function in 3 seconds
setTimeout(() => {
    console.log("time out in 300")
}, 3000);
*/


/*
a way to stop the interval
setTimeout(() => {
    console.log("time out in 3 seconds")
    clearInterval(int)
}, 3000);

const int = setInterval(() => {
    console.log("every 1 seconds")
}, 1000)
*/

// global object in node is different than global object in window such as access to documnet model or query selector
// console.log(__dirname); -- absolute path we are curretly in
// console.log(__filename); -- abosolute path plus the file name we are in 

// use node js we dont need window access, we just need access to server side 
