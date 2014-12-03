// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
  baseUrl: 'js',
  paths: {
    jquery: 'libs/jquery-1.11.1.min',
    jquery_mobile: 'libs/jquery.mobile-1.4.4.min'
  }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['main']);
