var Validation = function(){};

// Clase para validación de elementos del usuario
Validation.prototype = {
	email : function(email){
		var pattern = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
		return pattern.test(email);
	},
	phone: function(ag){
		if(ag === "" || ag === null || isNaN(ag)){
			return false;
		}else{
			var pattern = new RegExp(/^[0-9]+$/);
  			return pattern.test(ag);
		}
	},
	name: function(nam){
		if(nam === "" || nam === null || nam.length === 0 || nam.length < 10){
			return false;
		}else{
			return true;
		}
	},
	password: function(pass){
		if(pass === "" || pass === null || pass.length === 0 || pass.length < 4 || pass === undefined){
			return false;
		}else{
			return true;
		}
	}
};

sessionStorage.removeItem('sessionId');

$(document).on('pageinit', '#home', function(event){
	if('sessionStorage' in window && window['sessionStorage'].length === 0){
		$.mobile.changePage('#login');
	} else {
		if(sessionStorage.getItem('sessionId')){
			$.mobile.changePage('#home');
		}else{
			$.mobile.changePage('#register');
		}
	}
});


$(document).on('pageinit', '#login', function(){
	
	var validate  = new Validation();

	$('#loginUser').on('click', function(event){
		console.log('click on loginUser');
		if(validate.email($('#loginemail').val()) && validate.password($('#loginpassword').val())){
			var user = {
				"email" : $('#loginemail').val(),
				"password" : $('#loginpassword').val()
			};
			$.ajax({
				url : "http://127.0.0.1:7070/api/v1/user/login",
				type: "POST",
				dataType : "JSON",
				data : user,
				success: function(data){
					if(data.firstname !== undefined || data.lastname !== undefined || data.cookie !== undefined){
						console.log('esto es data: ' + data.firstname + " " + data.lastname + " " + data.cookie);
						sessionStorage.setItem('sessionId', data.cookie);
						localStorage.setItem('firstname', data.firstname);
						localStorage.setItem('lastname', data.lastname);
						localStorage.setItem('password', data.password);
						localStorage.setItem('phone', data.phone);
						$.mobile.changePage('#home');
					}else{
						function onConfirm(buttonIndex) {
							$('#loginForm').trigger('reset');
							console.log(buttonIndex);
							if(buttonIndex === 1){
								$.mobile.changePage('#register');								
							}else{
								$.mobile.changePage('#login');								
							}
						}

						navigator.notification.confirm(
						    'El usuario no existe!' + '\n' + 
						    'Registrar: Para crear su usuario' + '\n' + 
						    'Cancelar para volver a intentar', // message
						     onConfirm,            // callback to invoke with index of button pressed
						    'Game Over',           // title
						    ['Registrar','Cancelar']     // buttonLabels
						);
						return false;
					}
				},
				error: function(xhr,status,error){
					console.log(xhr,status,error);
				}
			});
			event.preventDefault();
		}else if('sessionStorage' in window && window['sessionStorage'].length > 0){
			$.mobile.changePage('#home');
		}else{
			$('.error').text('Ninguno de los campos puede estar en blanco');
			$('.error').show();
			event.preventDefault();
		}
	});
});