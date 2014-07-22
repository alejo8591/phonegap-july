/* Varaibles y elementos del tipo Booelano  */

var verdadero = true;
var falso = false;

/* elementos de comparaciÃ³n  */

/* igualdad (==)  */
console.log(1 == 1);
// CorrecciÃ³n de tipos
console.log("1" == 1); // Convierte de "1" a 1
console.log(1 == true);
console.log(0 == false);
console.log("" == 0); // Convierte "" a 0
console.log(0 == ""); // Convierte "" a 0
console.log("    " == 0);
// declarar un objeto
var x = {};
var y = x;
// comparo los objetos
console.log("La comparaciÃn de los objetos es: " + (x == y));

/* igualdad estricta (===)  */
console.log("1" === 1);
console.log("" === 0);

var w = {};
var z = w;

console.log("La comparaciÃ³n de los objetos de manera estricta es:"  + (w===z));


// comparacion no estricta de no igual (!=)
console.log("" != 0);

// comparacion estricta de no igual (!==)
console.log("" !== 0);

/* Flujos logicos  */
console.log("---- Flujos logicos -----");
console.log(true && true);
console.log(true && false);
console.log(false && true);
console.log(false && false);

// operador del tipo OR
console.log("tabla basica del OR");
console.log(true || true);
console.log(true || false);
console.log(false || true);
console.log(false || false);

