// we can interact with our file system with node.js

const fs = require("fs") // module file system 

// try each section separetly to test out 

// read

// takes 2 args, 1st is relative path , 
// 2nd arg is a function will fire when this is completed. this method is async, so it takes some time to do. once its done it will fire this func. 
// you will take the data and the err in this call back func
// this function is async -> takes some time to do. does not block our code. does not stop the code in the function. gonna continue to the next parts of the code
// this function takes time: reads the file which takes time. in mean time js goes down the code and executes that and then comes back and fires the call back function
// fs.readFile('./docs/blog1.txt', (err, data) => {
//     if (err) {
//         console.log(err)
//     }
//     // console.log(data)
//     // <Buffer 68 65 6c 6c 6f 2c 20 74 75 73 68 61 72> when you print data. baiscally a package of data sent to us 
//     console.log(data.toString())
// });

// console.log("last time")

// write . 3 args. 1 is the relative path you want to write. 2nd arg is to replace anything you want in the text file with the input
// 3rd arg is a call back function. since its a async function. it will start writeFile then go further down the code, then call back function is called
// if file is not there, a new file will be created and will be written 
// fs.writeFile('./docs/blog1.txt', "hello world", () => {
//     console.log('file was written')
// })

// directories
// try to call a new folder in this folder
// remeber this is a async func, so all the stuff below the call back func will be executed then will come back and execute call back. after the funciton braces
// to make sure it does not exist use fs.existsSync() -> this is a sync method and will block the code
// if (!fs.existsSync('./assets')) {
//     fs.mkdir('./assets', err => {
//         if (err) {
//             console.log(err);
//         }
//         console.log('folder created');
//     });
// } else {
//     fs.rmdir('./assets', err => {
//         if (err) {
//             console.log(err);
//         }
//         console.log('folder deleted');
//     });
// }// specify what directory to make and where to make this. make in the current directory and create a folder called assets

// deleting files
// if (fs.existsSync('./docs/deleteme.txt')) {
//     fs.unlink('./docs/deleteme.txt', err => { // deletes the file
//         if (err) {
//             console.log(err);
//         }
//         console.log('file deleted');
//     });
// }

// sometimes files can be large and it can take long time to read them and we have to wait a while to do something with the data before we fully read
// using streams we can start using data before it is fully read
// if we have a huge file, we can wait until everything is read and do something
// else we can pass small packages of data into the browser through stream. small packages, buffer, are sent through stream
// we can start using these small packages