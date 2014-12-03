require(['Models/User', 'Router'], function(User, Router){
  var users = [
        new User('Romero Triana'),
        new User('Laura M,'),
        new User('Keren Saenz')
  ];

  for (var i = 0; i < users.length; i++) {
    console.log(users[i].name);
  }

  localStorage.users = JSON.stringify(users);

  Router.startRouting();
});
