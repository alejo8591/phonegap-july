define([
  'jquery',
  'jquery_mobile',
  '../Models/Product',
  '../Views/ViewProduct'
  ],
  function($, jquery_mobile){

    var revealProducts = function(id_page, id_list, products){

      $('#' + id_page).append('<ul data-role="listview" id="'+ id_list +'"></ul>');

      for (var i = 0; i < products.length; i++) {
        $('#' + id_list).append('<li>' + products[i].name + '</li>');
      }

      $('#' + id_list + ':visible').listview().listview('refresh');

    };

    return {
      revealProducts: revealProducts
    }

  });
