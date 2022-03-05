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



// 使用递归完成 1 到 100 的累加
// function sum(num) {
//   if (num === 1) {
//     return 1;
//   } else {
//     return num + sum(num-1);
//   }
// }
// console.log(sum(100));

// // 事件委托
// document.querySelector('ul').onclick = (event) => {
//   let target = event.target
//   if (target.nodeName === 'LI') {
//     console.log(target.innerHTML);
//   }
// }

// // 不使用事件委托
// document.querySelectorAll('li').forEach((e) => {
//   e.onclick = function() {
//     console.log(this.innerHTML);
//   }
// })


// // call apply bind
// let obj = { name: 'tony' };

// function Child(name) {
//   this.name = name;
// }

// Child.prototype = {
//   constructor: Child,
//   showName: function() {
//     console.log(this.name);
//   }
// }

// var child = new Child('thomas');
// child.showName();

// child.showName.call(obj);
// child.showName.apply(obj);
// let bind = child.showName.bind(obj); //返回一个函数
// bind();



// 去除字符串空格
// 1. replace 正则
// 去除字符串内所有空格：str =str.replace(/\s*/g, "");
// var str = "  qwe t w asd qwe ";
// var str1 = str.replace(/\s*/g, ""); // 所有 
// var str2 = str.replace(/^\s*/, ""); // 左侧
// var str3 = str.replace(/\s*$/g, ""); // 右侧
// var str4 = str.replace(/^\s*|\s*$/g, ""); //两侧

// // 2. trim()
// var str5 = str.trim(); // 两侧
// var str6 = str.trimStart();
// var str7 = str.trimEnd();

// console.log(str);
// console.log(str1);
// console.log(str2);
// console.log(str3);
// console.log(str4);
// console.log(str5);
// console.log(str6);
// console.log(str7);


// 箭头函数与普通函数的区别
// let fn = name => {
//   console.log(name);
// }
// let fn2 = function(name) {
//   console.log(name);
// }
// console.dir(fn);
// console.dir(fn2);


// apply
// let a = { name: '大成' };
// let b = {
//   name: '方公子',
//   sayName: function () {
//     console.log(this.name);
//   }
// }
// b.sayName();
// b.sayName.apply(a);


// bind
// function fn(...args) {
//   console.log(this, args);
// }
// let obj = {
//   name: 'waman',
// }

// fn.bind(obj, 'z')('w') // {name: 'waman'} {"z", "w"}


// 实现一个 bind
// Function.prototype.mybind = function () {
//   // 先将参数转换为数组
//   let args = Array.prototype.slice.apply(arguments);
//   // 提取参数的第一项，即 this 指向
//   let _this = args.shift();
//   // 获取当前 this
//   let self = this
//   // 返回一个当前函数的拷贝
//   return function () {
//     return self.apply(_this.args)
//   }
// }


// 使用场景
// 数组合并
// let arr1 = [1, 2, 3];
// let arr2 = [4, 5, 6];
// let arr3 = [];
// [].push.apply(arr1, arr2);
// console.log(arr1); // [1, 2, 3, 4, 5, 6]
// console.log(arr2); // [4, 5, 6]
// console.log(arr3); // []
// [].push.apply(arr3, arr1);
// console.log(arr3); // [1, 2, 3, 4, 5, 6]


// 防抖
// function debounce (fn, delay = 500) {
//   // 防抖也是闭包的一个应用
//   let timer = null
//   function f () {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       fn.apply(this, arguments);
//     }, delay)
//   }
//   return f
// }


//  继承
// function Father (name) {
//   this.name = name;
// }

// function Son (name) {
//   this.age = 23
//   Father.call(this, name)
// }

// let boy = new Son('leibaio')
// console.log(boy.name, boy.age); // leibaio 23



// new 操作符具体干了什么
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// Person.prototype.sayName = function () {
//   console.log(this.name);
// }

// const person1 = new Person('James', 23);
// console.log(person1); // Person {name: "James", age: 23}

// person1.sayName(); // James

// 在构建函数中显式加上返回值，并且返回值是一个原始类型
// function Test(name) {
//   this.name = name;
//   return 1;
// }
// const t = new Test('xxx');
// console.log(t)  // Test {name: "xxx"}

// 在构造函数中返回一个对象
// function Test(name) {
//   this.name = name;
//   console.log(this);
//   return {
//     age: 26
//   }
// }
// const t = new Test('xxx'); // Test {name: "xxx"}
// console.log(t); //  {age: 26}
// console.log(t.name); // undefined


// 实现一个 new
function new1(Func, ...args) {
  // 1.创建一个新对象
  const obj = {};
  // 2.将新对象原型指向构造函数原型对象
  obj.__proto__ = Func.prototype;
  // 3. 将构造函数的this指向新对象
  let result = Func.apply(obj, args);
  // 4. 根据返回值判断
  return result instanceof Object ? result : obj;
}
// 测试一下
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function () {
  console.log(this.name);
}
let p = new1 (Person, 'Hamilton', 33);
console.log(p); //  Person {name: "Hamilton", age: 33}
p.say(); // Hamilton