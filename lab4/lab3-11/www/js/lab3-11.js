$(document).on('pageinit', '#device', function(event){
	$('#deviceInfo').on('click', function(){
		$('#deviceProperties').append(
			'<p>' + device.model + '</p>' +
			'<p>' + device.cordova + '</p>' +
			'<p>' + device.plaform + '</p>' +
			'<p>' + device.uuid + '</p>' +
			'<p>' + device.version + '</p>'
		);
	});
});