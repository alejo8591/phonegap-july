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