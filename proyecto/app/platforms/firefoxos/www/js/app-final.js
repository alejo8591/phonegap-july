console.log('app-final.js cargado...!!');

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
		if(nam === "" || nam === null || nam.length === 0 || nam.length < 4){
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

//sessionStorage.removeItem('sessionId');

$(document).on('pageinit', '#home', function(event){

	$('#lookCookie').on('click', function(event){
		$('#setCookie').empty();
		$('#setCookie').append('<span>' + sessionStorage.getItem('sessionId') + '</span>');
		event.preventDefault();
	});

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

	$('.user-login').hide();
	
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
						localStorage.setItem('email', data.email);
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
						    'Cancelar para volver a intentar',
						     onConfirm,
						    'Game Over',
						    ['Registrar','Cancelar']
						);
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
			$('.user-login').text('¡Revisa los campos!');
			$('.error').css('color', 'red');
			$('.user-login').show();
			event.preventDefault();
		}
	});
});


// SEGUNDA FASE REGISTRO
$(document).on('pageinit', '#register', function(event){
	$('.user-register').hide();
	console.log('Cargando evento delegado para create-user');

	$('#saveUser').on('click', function(){
		console.log('Click en SaveUser');

		var user = {};
		var validation = new Validation();

		user.email = $('#email').val();
		user.firstname = $('#firstname').val();
		user.lastname = $('#lastname').val();
		user.phone = $('#phone').val();
		user.password = $('#password').val();

		if(validation.email(user.email) && validation.name(user.firstname) && validation.name(user.lastname) && validation.phone(user.phone) && validation.password(user.password)){
			$.ajax({
				type : "POST",
				url : "http://127.0.0.1:7070/api/v1/user/create",
				dataType : "JSON",
				data : user
			}).done(function(data){
				if(data.error === undefined){
					sessionStorage.setItem('sessionId', data.cookie);
					localStorage.setItem('email', data.email);
					localStorage.setItem('firstname', data.firstname);
					localStorage.setItem('lastname', data.lastname);
					localStorage.setItem('password', data.password);
					localStorage.setItem('phone', data.phone);

					$(document).on('pageinit', '#profile', function(event){
						console.log('Cosnstruyendo DOM para Profile');
						$('#dataInfo').empty();
						$('#dataInfo').append(
							'<li>Nombre: <strong>' + data.firstname + '</strong></li>' +
							'<li>Apellido(s): <strong>' + data.lastname + '</strong></li>' +
							'<li>Email: <strong>' + data.email + '</strong></li>' +
							'<li>Móvil: <strong>' + data.phone + '</strong></li>' 
						);
						$('#dataInfo').listview('refresh');
					});

					$.mobile.changePage('#profile');
				} else {
					$('#createUserForm').trigger('reset');
					$.mobile.changePage('#login');
				}
			}).fail(function(data){
				$.mobile.changePage('#login');
			});
		}else{
			$('.user-register').text('Error en algumpos');
			$('.error').css('color', 'red');
			$('.user-register').show();
			event.preventDefault();
		}
	});
});


$(document).on('pageinit', '#profile', function(event){
	console.log('Construyendo DOM para Profile');
	$('#dataInfo').empty();
	$('#dataInfo').append(
		'<li>Nombre: <strong>' + localStorage.getItem('firstname') + '</strong></li>' +
		'<li>Apellido(s): <strong>' + localStorage.getItem('lastname') + '</strong></li>' +
		'<li>Email: <strong>' + localStorage.getItem('email') + '</strong></li>' +
		'<li>Móvil: <strong>' + localStorage.getItem('phone') + '</strong></li>' 
	);
		$('#dataInfo').listview('refresh');	
});


$(document).on('pageinit', '#editProfile', function(event){
	
	console.log('Cosnstruyendo DOM para editar Profile');

	$('input#editEmail').val(localStorage.getItem('email')).attr('disabled','disabled');
	$('input#editFirstname').val(localStorage.getItem('firstname'));
	$('input#editLastname').val(localStorage.getItem('lastname'));
	$('input#editPhone').val(localStorage.getItem('phone'));

	
	$('#updateProfile').on('click', function(){
		var update_data = {};

		update_data.email = localStorage.getItem('email');
		update_data.password = localStorage.getItem('password');

		if(localStorage.getItem('firstname') !== $('input#editFirstname').val()){
			update_data.firstname = $('input#editFirstname').val();
		} else {
			update_data.firstname = localStorage.getItem('firstname');
		}

		if (localStorage.getItem('lastname') !== $('input#editLastname').val()){
			update_data.lastname = $('input#editLastname').val();
		} else {
			update_data.lastname = localStorage.getItem('lastname');
		}

		if (localStorage.getItem('phone') !== $('input#editPhone').val()){
			update_data.phone = $('input#editPhone').val();
		} else {
			update_data.phone = localStorage.getItem('phone');
		}
		console.log(update_data);
		/*
			type (default: 'GET')
			Type: String
			The type of request to make ("POST" or "GET"), default is "GET". Note: Other HTTP request methods, 
			such as PUT and DELETE, can also be used here, but they are not supported by all browsers.
		*/
		$.ajax({
			type : "POST",
			url : "http://127.0.0.1:7070/api/v1/user/update",
			dataType : "json",
			data : update_data
		}).done(function(data){
			console.log('Ajax correcto');

			if(data.error === undefined){
				sessionStorage.setItem('cookie', data.cookie);
				localStorage.setItem('email', data.email);
				localStorage.setItem('firstname', data.firstname);
				localStorage.setItem('lastname', data.lastname);
				localStorage.setItem('password', data.password);				
				localStorage.setItem('phone', data.phone);
				$.mobile.changePage('#profile');
			} else {
				$('#loginForm').reset();
				console.log('hay error en el Ajax');
				$.mobile.changePage('#login');
			}
		}).fail(function(data){
			console.log('Fallo el Ajax');
			$.mobile.changePage('#login');
		});
	});
});