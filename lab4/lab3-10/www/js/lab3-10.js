$(document).on('pageinit', '#home' ,function(){

	function alertConnection(){
		var networkState = navigator.connection.type;

		var states = {};

		states[Connection.UNKNOWN] = 'Sin conexión';
		states[Connection.ETHERNET] = 'Conexión por Ethernet';
		states[Connection.WIFI] = 'Conexión por Wi-Fi';
		states[Connection.CELL_2G] = 'Conexión por 2G';
		states[Connection.CELL_3G] = 'Conexión por 3G';
		states[Connection.CELL_4G] = 'Conexión por 4G';
		states[Connection.CELL] = 'Conexión generica';
		states[Connection.NONE] = 'No hay red alguna';

		$('#infoAlert').append('<h2>Conexión del tipo:</h2><br /> <h1>' + states[networkState] + '</h1>');
	}

	$('#alertPhoneGap').on('click', function(event){
		navigator.notification.alert(
			'Presione "Aceptar" para conocer la conexión', // Mensaje
			alertConnection, // llamando el callback que realiza otra operación
			'Conexión', // Titulo del  mensaje
			'Aceptar' // Label del boton
		);
	});
});
