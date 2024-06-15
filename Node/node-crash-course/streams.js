const fs = require('fs');

// frist arg is where do we want to pass data from

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8' }); // creates read stream 
// option object, 2nd parameter means its going to encode this and will be readable format so we dont need to use toString 


const writeStream = fs.createWriteStream('./docs/blog4.txt');


// created read stream and tell node where we are reading data. this is a event listener. listener to data event.
// everytime we get a input of data from this stream, we can use this straight away . everytime we get a chunk of data, we will call back function
// 
readStream.on('data', chunk => {
    // console.log('---- NEW CHUNK ----');
    // console.log(chunk);
    writeStream.write('\nNEW CHUNK:\n');
    writeStream.write(chunk);
});

// piping
// readStream.pipe(writeStream);
// open up the read stream, it is piping into the write stream same like above.


