define(['../Views/AddView', '../Models/User'], function(AddView, User){
  function start() {
    AddView.render();
    bindEvent();
  }

  function bindEvent(){
    document.getElementById('add').addEventListener('click', function(){
      var users = JSON.parse(localStorage.users);
      var user_name = document.getElementById('user-name').value;
      users.push(new User(user_name));

      localStorage.users = JSON.stringify(users);

      require(['../Controllers/ListController'], function(ListController){
        ListController.start();
      });
    }, false);
  }

  return {
    start:start
  };
});
