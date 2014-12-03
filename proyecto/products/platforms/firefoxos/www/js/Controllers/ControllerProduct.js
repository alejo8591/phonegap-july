define([
  'jquery',
  'jquery_mobile',
  '../Models/Product',
  '../Views/ViewProduct'
  ],
  function($, jquery_mobile, Product, ViewProduct){

    var getListProducts = function(id_page, id_list){
      
      $.get('http://127.0.0.1:7070/api/v1/product/list', function(data) {

        var products = [];

        for(var i = 0; i < data.length; i++) {
          products[i] = new Product(data[i].name, data[i].type, data[i].amount);
        }

        ViewProduct.revealProducts(id_page, id_list, products);

      });
    };

    return {
      getListProducts:getListProducts
    }
});
