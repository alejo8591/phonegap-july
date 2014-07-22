/* Callbacks en JS */
/*
Un callback es un una funcion, que por parametro se le envia otra 
funcion, y la funcion que lo recibe, espera a que se ejecute 
esa funcion
*/
function algo(miCallback){
	miCallback();
}

algo(function(){
	console.log("Esto es un callback");
});


function otroCallback(miCallback){
	miCallback('Un argumento');
}

otroCallback(function(unValor){
	console.log('Algo se imprime y es: '+ unValor);
});

/* multiples callbacks llamado en determinados casos*/

function algoOcurre(callback1, callback2, callback3){
	// Pasa la primera vez
	callback1('Primer paso');

	// Siguiente callback
	callback2('Segundo Paso');

	// Y por ultimo
	callback3('ultimo y tercer paso');
}

// Llamado y uso de los multiples Callbacks para 'algoOcurre'
algoOcurre(
	function(paso1){
		console.log(paso1);
	},
	function(paso2){
		console.log(paso2);
	},
	function(paso3){
		console.log(paso3);
	}
);


