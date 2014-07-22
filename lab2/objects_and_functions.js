/* objetos y Funciones  */

var myObject = new Object();

var myObject = {};

// Los Array tambiénson objetos
var lotter = [4,6,7,7,7,8]

profile = {
	firstName : "Alejandro",
	lastName : "Romero",
	phone :  "1112122"
}

console.log(profile.firstName);
console.log(profile["lastName"]);

// Iterando sobre un objeto {}
for(key in profile){
	console.log(profile[key]);
}

/* Funciones  */
function test(){
	console.log("Hola");
}

test();

// Uso de funcion anonima
chao = function(){
	console.log("Chao");
}

chao();
