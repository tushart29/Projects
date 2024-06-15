const xyz = require('./people') // returns an empty object currently 
// just because we import this file does not mean we can access that code in a different file,  you first have to manually export it in the other file
// ./ -> look at the same directoy this file is in
// when we require, node looks for this file, and runs that file

console.log(xyz)
