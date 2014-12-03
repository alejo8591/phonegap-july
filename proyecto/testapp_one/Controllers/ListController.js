define(['../Views/ListView'], function(ListView){
  function start() {
    var users = JSON.parse(localStorage.getItem('users'));
    console.log('ListController: ' + users);
    ListView.render({users:users});
  }

  return {
    start:start
  };

});
