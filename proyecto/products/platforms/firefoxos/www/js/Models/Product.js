define(function(){
  function Product(name, type, amount){
    this.name = name || 'Producto';
    this.type = type || 'Tipo';
    this.amount = amount || 'Costo';
  }
  
  return Product;
});
