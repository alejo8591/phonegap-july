require([
  'jquery',
  'mobile',
  'Controllers/ControllerProduct'
  ],
  function($, mobile, ControllerProduct){

    console.log('`main` OK');
    /*var mobile = jquery_mobile;
    /* Delegate Event: home */

    //$(document).on('change', '#home', function(){
      console.log('`#home` OK');
      if(window.sessionStorage.length >= 1){
        console.log('SessionStorage OK ' + window.sessionStorage.length >= 1);
        $('body').pagecontainer('change','#home');
        ControllerProduct.getListProducts('content-home', 'products-list');
      } else {
        console.log('change page');
        $('body').pagecontainer('change','#options');
      }
    //});
});
