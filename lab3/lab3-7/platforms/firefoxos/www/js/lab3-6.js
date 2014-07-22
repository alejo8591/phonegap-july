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

$(document).ready(function(){
	$('.error').hide();

	$('#myInfo').on('click', function(event){

		var validate  = new Validation();

		var data = $('#email').val();

		if(validate.email(data)){
			$('.email').hide();
			localStorage.setItem('email', data);
			event.preventDefault();
		} else{
			$('.email').show();
			event.preventDefault();
		}
		var userid = $('#userid').val();
		if (validate.userid(userid)){
		$('.userid').hide();
			localStorage.setItem('userid', userid);
			event.preventDefault();
		} else{
			$('.userid').show();
			event.preventDefault();
		}
	});
});

$(document).on('pageinit', '#viewInfo', function(event){
		$('#myViewInfo').append(
			'<ul>' + '<li>El correo es: ' + localStorage.getItem('email') + '</li>' +
			'<li>El usuario es: ' + localStorage.getItem('userid') + '</li></ul> ' 
		);
		event.preventDefault();
});