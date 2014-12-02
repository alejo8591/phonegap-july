require(['../Models/User', '../Controllers/ListController'], function(User, ListController){
  var users = [
        new User('Romero Triana'),
        new User('Laura M,'),
        new User('Keren Saenz')
  ];

  for (var i = 0; i < users.length; i++) {
    console.log(users[i].name);
  }

  localStorage.users = JSON.stringify(users);

  ListController.start();

});
