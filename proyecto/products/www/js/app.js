define([], function(){
  var start = function() {
    require([ 'overrides', 'jquery', 'jqm' ],function() {

      // your magic goes here...

      // request a plugin:
      $(document).on('pagebeforeshow.add2home', '#home', function() {
        // add2Home - trigger once and lock
        var dom = $('html');
        if ( dom.jqmData('bound') != true ) {
          dom.jqmData('bound', true);
          require(['app'], function (App) {
            App.render();
          });
        };
      });

      // don't forget to trigger JQM manually
      if ( $.mobile.autoInitializePage == false){
        $.mobile.initializePage();
      }
    }); // end require
  } // end start
  return {"start":start};
});
