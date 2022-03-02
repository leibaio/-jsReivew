// 对象克隆 支持基本数据类型及对象 递归
// function clone(obj) {
//   var o;
//   switch (typeof obj) {
//     case "undefined":
//       break;
//     case "string": o = obj + "";
//       break;
//     case "number": o = obj - 0;
//       break;
//     case "boolean": o = obj;
//       break;
//     case "object": //分为 对象（Object）和 数组（Array）
//       if (obj === null) {
//         o = null;
//       } else {
//         if (Object.prototype.toString.call(obj).slice(8, -1) === "Array") {
//           o = [];
//           for (var i = 0; i < obj.length; i++) {
//             o.push(clone(obj[i]));
//           }
//         } else {
//           o = {};
//           for (var k in obj) {
//             o[k] = clone(obj[k]);
//           }
//         }
//       }
//       break;
//     default: o = obj;
//       break;
//   }
//   return o;
// }

// var m1 = clone([1, 2, 3]);
// var m2 = clone('1', 'hello');
// console.log(m1);
// console.log(m2);

// let arr = [1, 2, 3, 3, 4, 5, 6, 6, 9, 2, 3, 5];
// let newArr = [];

// 1. 双重循环 使用 splice
// for (let i = 0; i < arr.length; i++) {
//   for (let j = i + 1; j < arr.length; j++) {
//     if (arr[i] == arr[j]) {
//       arr.splice(j, 1);
//       j--;
//     }
//   }
// }


// 2. 双重循环 使用newArr
// for (let i = 0; i < arr.length; i++) {
//   let bool = true;
//   for (let j = 0; j < newArr.length; j++) {
//     if (arr[i] === newArr[j]) {
//       bool = false;
//     }
//   }
//   if (bool) {
//     newArr[newArr.length] = arr[i];
//   }
// }


// 3. includes 函数判断去重
// for (let i of arr) {
//   if (!newArr.includes(i)) {
//     newArr.push(i);
//   }
// }


// 4. filter 循环过滤去重
// arr.filter((val, index) => {
//   if (newArr.indexOf(val) < 0) {
//     newArr.push(val);
//   }
// })


// 5. sort 排序去重
// arr = arr.sort();
// for (let i = 0; i < arr.length; i++) {
//   if (i <= arr.length - 1 && arr[i] != arr[i + 1]) {
//     newArr.push(arr[i]);
//   }
// }


// // 6. ES6 Array.from() 方法
// console.log(Array.from(new Set(arr)));
// console.log([...new Set(arr)]);

// console.log(arr);
// console.log(newArr);


