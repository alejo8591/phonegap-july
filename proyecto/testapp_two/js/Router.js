define(function(){

  var routes = [
  {hash:'#list', controller:'ListController'},
  {hash:'#add',  controller:'AddController'}
  ];

  var defaultRoute = '#home';
  var currentHash = '';

  function startRouting(){
    window.location.hash = window.location.hash || defaultRoute;
    setInterval(hashCheck, 100);
  }

  function hashCheck(){
    if (window.location.hash != currentHash){
      for (var i = 0, currentRoute; currentRoute = routes[i++];){
        if (window.location.hash == currentRoute.hash)
          loadController(currentRoute.controller);
        }
        currentHash = window.location.hash;
      }
    }

    function loadController(controllerName){
      require(['Controllers/' + controllerName], function(controller){
        console.log('On Load Controller');
        controller.start();
      });
    }

    return {
      startRouting:startRouting
    };
  });
