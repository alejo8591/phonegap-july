var myMath = (function(){
  function add(a,b){
    return a + b;
  }

  return {
    add: add
  }
})();

console.log(myMath.add(1,2));
