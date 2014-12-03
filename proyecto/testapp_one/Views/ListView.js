define(function(){

  function render(parameters){

    var app_div = document.getElementById('app');

    var users = parameters.users;

    console.log('ListView: ' + users);

    var html = '<ul>';

    var len = users.length;

    for (var i = 0; i < len; i++) {
      html += '<li>' + users[i].name + '</li>';
      console.log(users[i].name);
    }

    html += '</ul>';

    app_div.innerHTML = html;
  }

  return {
    render:render
  };
});
