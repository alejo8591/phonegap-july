$(document).on('pageinit', '#home', function(){
	
	$('#infoAccelerometer').on('click', function(event){

		function onSuccess(acceleration){
			alert(acceleration.x + " " + acceleration.y + " " + acceleration.z + " " + acceleration.timestamp);
		}

		function onError(){
			alert('Algo salio mal');
		}

		console.log('click on "infoAccelerometer"');
		navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
	});
});

$(document).on('pageinit', '#watchAccelerometer', function(){

		var options;

				options = { frequency : 30 };


		function onSuccess(acceleration){
			$('#revealWatchAccelerometer').empty();
			$('#revealWatchAccelerometer').append(
				'<li>Aceleración en X: ' + acceleration.x + '</li>' +
				'<li>Aceleración en Y: ' + acceleration.y + '</li>' + 
				'<li>Aceleración en Z: ' + acceleration.z + '</li>' +
				'<li>Aceleración en Y: ' + acceleration.timestamp + '</li>'
			);
			$('#revealWatchAccelerometer').listview('refresh');
		}

		function onError(){
			alert('Algo salio mal');
		}
		
		console.log('click on "infoAccelerometer"');

		navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
});










