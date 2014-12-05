// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
/*requirejs.config({
  baseUrl: 'js',
  paths: {
    jquery: 'libs/jquery-1.11.1.min',
    jquerymobile: 'libs/jquery.mobile-1.4.4.min'
  }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['main']);*/

var IS_LOCAL  = /(:\/\/localhost|file:\/\/)/.test(document.location.href);

requirejs.config({
  waitSeconds :  (IS_LOCAL? 2 : 45)
  ,  baseUrl:       'js'
  //,  enforceDefine: true
  , paths: {
      //app:          'app'
      overrides:    'overrides'
    , jquery:       'libs/jquery-1.11.1.min'
    , mobile:          'libs/jquery.mobile-1.4.4.min'
  }
  , shim: {
    'overrides':{
      deps: ['jquery']
    }
    , 'mobile': {
      deps: ['jquery']//,
      //exports: 'mobile'
      }
  }
});

requirejs(['main']);
