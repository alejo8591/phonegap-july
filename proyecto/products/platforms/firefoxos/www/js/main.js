require([
  'jquery',
  'jquery_mobile',
  'Controllers/ControllerProduct'
  ],
  function($, jquery_mobile, ControllerProduct){
    ControllerProduct.getListProducts('content-home', 'products-list');
});
