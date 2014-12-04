define([
  'jquery',
  'mobile',
  '../Models/Product',
  '../Views/ViewProduct'
  ],
  function($, mobile){

    var revealProducts = function(id_page, id_list, products){

      $('#' + id_page).append('<ul data-role="listview" id="'+ id_list +'"></ul>');

      for (var i = 0; i < products.length; i++) {
        $('#' + id_list).append('<li>' + products[i].name + '</li>');
      }
      /*
      https://stackoverflow.com/questions/10373618/jquerymobile-error-cannot-call-methods-on-listview-prior-to-initialization/19111711#19111711
      */
      $('#' + id_list + ':visible').listview().listview('refresh');

    };

    return {
      revealProducts: revealProducts
    }

  });
