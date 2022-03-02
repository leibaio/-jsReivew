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



// 闭包1：函数作为返回值
// function test() {
//   const a = 1;
//   return function() {
//     console.log('a', a);
//   }
// }

// const fn = test();
// const a = 2;
// fn();


// 闭包2: 函数作为参数
// function test(fn) {
//   const a = 1;
//   fn();
// } 

// const a = 2;
// function fn() {
//   console.log('a', a);
// }

// test(fn);


// 作用域和自由变量
// 子作用域可以访问父作用域，反之不行
// let a1 = 1;

// function fn1() {
//   let a2 = 10;

//   function fn2() {
//     let a3 = 100;
//     console.log('a2 inside', a2)
//   }

//   fn2();
// }

// fn1();


// this的值 ： this是在函数执行时决定的，不是在函数定义时决定的
// function test() {
//   console.log('this', this);
// }

// test();

// test.call({ name: 'leibaio' });
// test.apply({ name: 'leibaio' });

// const boundTest = test.bind({ name: 'leibaio' });
// boundTest();


// class Person {
//   constructor(name, age) {
//     console.log('constructor 里的 this', this);
//     this.name = name;
//     this.age = age;
//   }

//   test() {
//     console.log('对象方法里的 this', this);
//   }

//   asyncTest() {
//     console.log('this', this);
//     setTimeout(function() {
//       console.log('setTimeout 回调里的 this', this)
//     }, 0)
//   }
// }

// const zhangsan = new Person('张三', 20);
// zhangsan.test();
// zhangsan.asyncTest();