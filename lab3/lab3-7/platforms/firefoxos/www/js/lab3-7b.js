//"use strict";

var Validation = function(){};

Validation.prototype = {
	email : function(email){
		var pattern = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
		return pattern.test(email);
	},

	userid: function(username){
		var pattern = new RegExp(/^[a-z0-9_]+$/);
		return pattern.test(username);
	},
	age: function(ag){
		if(ag === "" || ag === null || isNaN(ag)){
			return false;
		}else{
			var pattern = new RegExp(/^[0-9]+$/);
  			return pattern.test(ag);
		}
	},
	ageRange: function(ag){
		if(ag<5 || ag>70){
			return false;
		}else{
			return true;
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
		if(pass === "" || pass === null || pass.length === 0 || pass.length < 6){
			return false;
		}else{
			return true;
		}
	}
};

// MD5 key
var md5_session = hex_md5("lab3-7");

// load INDEX
$(document).on('pageinit', '#index', function(event){
	if('sessionStorage' in window && window['sessionStorage'].length === 0){
		$.mobile.changePage('#login');
	} else {
		if(sessionStorage.getItem('sessionId') === md5_session){
			$.mobile.changePage('#index');
		}else{
			$.mobile.changePage('#register');
		}
	}
});

$(document).on('pageinit', '#login', function(event){
	
	var validate  = new Validation();

	$('#loginUser').on('click', function(event){
		console.log('click on loginUser');
		if(validate.userid($('#username').val()) && $('#password').val() !== "" && $('#password').val() !== null && 'sessionStorage' in window && window['sessionStorage'].length === 0){
			var user = {
				"username" : $('#username').val(),
				"password" : $('#password').val()
			};
			$.ajax({
				url : "js/data.json",
				type: "POST",
				dataType : "JSON",
				success: function(data){
					if(data.username === user.username){
						console.log("el usuario es correcto");
						$('.error').hide();
						sessionStorage.setItem('sessionId', md5_session);
						$.mobile.changePage('#index');
					}
					else{
						console.log("el usuario NO es correcto");
						$('.error').text('Alguno de los campos no es correcto');
						$('.error').show();
					}
				},
				error: function(xhr,status,error){
					console.log(xhr,status,error);
				}
			});
			event.preventDefault();
		}else if('sessionStorage' in window && window['sessionStorage'].length > 0){
			$.mobile.changePage('#index');
		}else{
			$('.error').text('Ninguno de los campos puede estar en blanco');
			$('.error').show();
			event.preventDefault();
		}
	});
});

$(document).on('pageinit', '#register', function(event){
	
	if('sessionStorage' in window && window['sessionStorage'].length === 0){
		$.mobile.changePage('#register');
	}else{
		if(sessionStorage.getItem('sessionId') === md5_session){
			$.mobile.changePage('#index');
		}else{
			$.mobile.changePage('#register');
		}
	}

	$('#registerUser').on('click', function(event){

		$('.error').hide();

		var validate  = new Validation();

		var user = {};
		user.name = $('#nameRegister').val();
		user.username = $('#usernameRegister').val();
		user.password = $('#passwordRegister').val();
		user.email = $('#emailRegister').val();
		user.age = $('#ageRegister').val();

		if(validate.name(user.name)){
			$('.user-name').hide();
			localStorage.setItem('name', user.name);
			event.preventDefault();
		}else{
			$('.user-name').text('El nombre no cumple con los criterios');
			$('.user-name').show();
			event.preventDefault();
		}

		if(validate.userid(user.username)){
			localStorage.setItem('username', user.username);
			event.preventDefault();
		}else{
			$('.user-username').text('El usuario no es correcto');
			$('.user-username').show();
			event.preventDefault();
		}

		if(validate.password(user.password)){
			$('.user-password').hide();
			localStorage.setItem('password', user.password);
			event.preventDefault();
		}else{
			$('.user-password').text('El password no cumple con los criterios');
			$('.user-password').show();
			event.preventDefault();
		}

		if(validate.email(user.email)){
			localStorage.setItem('email', user.email);
			event.preventDefault();
		}else{
			$('.user-email').text('El email no es correcto');
			$('.user-email').show();
			event.preventDefault();
		}

		if(validate.age(user.age)){
			if(validate.ageRange(user.age)){
				$('.user-age').hide();
				localStorage.setItem('age', user.age);
				event.preventDefault();
			}else{
				$('.user-age').text('La edad no esta dentro del rango');
				$('.user-age').show();
				event.preventDefault();
			}
		}else{
			$('.user-age').text('La edad esta en blanco');
			$('.user-age').show();
			event.preventDefault();
		}

		if(window['localStorage'].length === 5){
			sessionStorage.setItem('sessionId', md5_session);
			$.mobile.changePage('#index');
		}else{
			sessionStorage.removeItem('sessionId');
			$.mobile.changePage('#register');
		}
	});
});
