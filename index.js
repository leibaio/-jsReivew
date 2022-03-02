// 对象克隆 支持基本数据类型及对象 递归
function clone(obj) {
  var o;
  switch (typeof obj) {
    case "undefined":
      break;
    case "string": o = obj + "";
      break;
    case "number": o = obj - 0;
      break;
    case "boolean": o = obj;
      break;
    case "object": //分为 对象（Object）和 数组（Array）
      if (obj === null) {
        o = null;
      } else {
        if (Object.prototype.toString.call(obj).slice(8, -1) === "Array") {
          o = [];
          for (var i = 0; i < obj.length; i++) {
            o.push(clone(obj[i]));
          }
        } else {
          o = {};
          for (var k in obj) {
            o[k] = clone(obj[k]);
          }
        }
      }
      break;
    default: o = obj;
      break;
  }
  return o;
}

var m1 = clone([1, 2, 3]);
var m2 = clone('1', 'hello');
console.log(m1);
console.log(m2);