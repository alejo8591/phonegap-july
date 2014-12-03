define(function(){
  function render(parameters){
    var app_div = document.getElementById('app');
    app_div.innerHTML = '<input id="user-name" type="text" /><button id="add"> Add User</button>';
  }

  return {
    render:render
  };
});
