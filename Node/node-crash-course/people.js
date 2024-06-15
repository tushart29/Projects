const people = ["tushar", "russell", 'lebron', "steph"]
const age = [1, 2, 32, 4]
console.log(people)

// module.exports = {
//     people: people, // add a property called people and then assign people to that property 
//     age: age
// } // whatever we set this equal to, we will be returning when we do require


module.exports = {
    people, age
}