function outer(){

  var num = 0;

   function inner(){

        num++;

        console.log(num);

  }

      return inner;

}

var f1 = outer();

f1();

f1();

var f2 = outer();

f2();

f2();