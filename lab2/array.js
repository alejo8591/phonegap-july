/* Arrays  */
var myArray = new Array();

var myArray = [];

myArray = [1,3,3,4,45,6,5,56,6,6];

console.log(myArray[0]);
// con push agrego un elemento al final
myArray.push(10);

console.log(myArray);

myArray.push(1223);

console.log(myArray);

myArray.push("Hola cidei");

console.log(myArray);

// pop elimina el ultimo elemento del array

myArray.pop();

console.log(myArray);

// inverse invierte el orden del Array

myArray.reverse();

console.log(myArray);

// shift elimina el primer elemento

myArray.shift();

console.log(myArray);

// Sort, organiza el array en forma ascedente

myArray.sort();

console.log(myArray);

//var mySecondArray = [ "Hola mundo", "Stringds", "cidei"];

// console.log(mySecondArray);

// mySecondArray.sort();

//console.log(mySecondArray.sort());

// splice 

var tasks = ["Hola mundo", "Hola cidei", "Chao", "Cuatro", "Cinco"];

console.log(tasks);

tasks.splice(1,3,"Chao cidei", "Adios", "holalal"); 

console.log(tasks);
