/* Web Storage methods */
var WebStorage = function(){};

WebStorage.prototype.sessionStorageSupported = function() {
  try{
    return 'sessionStorage' in window && window['sessionStorage'] !== null;
  } catch(error) {
    return false;
  }
};

WebStorage.prototype.localStorageSupported = function() {
  try{
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(error) {
    return false;
  }
};

WebStorage.prototype.sessionStorageCheck = function() {
  try{
    return window.sessionStorage.length >= 1;
  } catch(error) {
    return false;
  }
};

/* Inject Nodes */

var InjectNodes = function(){};

InjectNodes.prototype.appendNodes = function(id_page){

  for (var i = 1; i < arguments.length; i++){
    $(id_page).append(arguments[i]);
  }
};

/* Create database */
var user_info = new Lawnchair({name:'user_info', adapter:'dom'}, function(e){
  console.log(e);
});

$(document).on('pagecreate', '#home', function(){

  webStorage = new WebStorage();

  if (webStorage.sessionStorageSupported()) {

    console.log('sessionStorage support OK');

    if (webStorage.sessionStorageCheck()) {

      console.log('sessionStorage `#home` Check');

      $.get('http://192.168.0.3:7070/api/v1/product/list', function(data){

        console.log(data.length);

        $("#content-home-list-products").children().remove();

        var nodes;

        for (var i = 0; i < data.length; i++) {
          $('#content-home-list-products').append('<li><a href="#" id="product-' + data[i].id + '">' + data[i].name + '</a><li>');
        }

        $('#content-home-list-products').listview().listview('refresh');

      }).fail(function(error){
        console.log(error);
      });

    } else {
      console.log('Change Page');
      $('body').pagecontainer('change', '#options');
    }

  } else {

    console.log('Not support sessionStorage');
  }

});


$(document).on('pagecreate', '#options', function(){

  webStorage = new WebStorage();
  injectNodes = new InjectNodes();

  if (webStorage.sessionStorageSupported()) {

    console.log('sessionStorage support OK');

    if (webStorage.sessionStorageCheck()) {

      console.log('sessionStorage Check');

    } else {
      console.log('Add Nodes: buttons');

      injectNodes.appendNodes(
        '#options>#content-options',
        '<a href="#login" class="ui-btn ui-corner-all">¡Ingresar!</a>',
        '<a href="#register" class="ui-btn ui-corner-all">¡Registrarme!</a>'
      );
    }

  } else {

    console.log('Not support sessionStorage');
  }

});

$(document).on('pagecreate', '#login', function(){

  webStorage = new WebStorage();
  injectNodes = new InjectNodes();

  if (webStorage.sessionStorageSupported()) {

    console.log('sessionStorage support OK');

    if (webStorage.sessionStorageCheck()) {

      console.log('sessionStorage Check');

    } else {
      console.log('Escuchando evento `click`');

      $('#button-access').bind('click', function(event){

        var email = $('#email-login').val();
        var password = $('#password-login').val();

        $.post('http://192.168.0.3:7070/api/v1/user/login', {"email":email, "password":password}, function(data){

          console.log(data);

          window.sessionStorage.setItem('cookie', data.cookie);

          user_info.save({key:'user', detail:data});

          $.get('http://192.168.0.3:7070/api/v1/product/list', function(data){

            console.log(data.length);

            $("#content-home-list-products").children().remove();

            var nodes;

            for (var i = 0; i < data.length; i++) {
              $('#content-home-list-products').append('<li><a href="#" id="product-' + data[i].id + '">' + data[i].name + '</a><li>');
            }

            $('#content-home-list-products').listview().listview('refresh');

          }).fail(function(error){
            console.log(error);
          });

          $('body').pagecontainer('change', '#home');

        }).fail(function(error){
          console.log(error);
        });

        event.preventDefault();
      });

    }

  } else {

    console.log('Not support sessionStorage');
  }

});
