Validation = function(){};

Validation.prototype = {
	email : function(email){
		var pattern = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
		return pattern.test(email);
	},

	userid: function(userid){
		var pattern = new RegExp(/^[a-z0-9_]+$/);
		return pattern.test(userid);
	}
};

// MD5 key
var md5_session = hex_md5("lab3-7");

// load INDEX
$(document).on('pageinit', '#index', function(event){
	if('sessionStorage' in window && window['sessionStorage'].length === 0){
		$.mobile.changePage('#login');
	} else {
		if(sessionStorage.getItem('sessionId' === md5_session)){
			$.mobile.changePage('#index');
		}else{
			$.mobile.changePage('#register');
		}
	}
});

$(document).on('pageinit', '#login', function(event){
	$('.error').hide();
	
	var validate  = new Validation();

	$('#loginUser').on('click', function(event){
		console.log('click on loginUser');
		if(validate.userid($('#username').val()) && $('#password').val() !== "" && $('#password').val() !== null){
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
		} else {
			$('.error').text('Ninguno de los campos puede estar en blanco');
			$('.error').show();
			event.preventDefault();
		}
	});
});