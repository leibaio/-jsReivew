****

### 简述同步和异步的区别

同步是阻塞模式，异步是非阻塞模式。

同步是指同一个进程在执行某个请求时，若该请求需要一段时间才能返回信息，那么进程会一直等待下去，直到收到返回信息后才继续执行。 

异步是指进程不需要一直等待，而是继续执行下面的操作，不管其他进程。当有消息返回，系统进行处理，提高执行效率。

### 怎么添加、移除、复制、创建和查找节点？

* 创建节点：

  ```js
  createElement() //创建一个具体的元素 nodeType = 1
  var p = document.createElement("p");
  p.nodeType; //1
  
  createTextNode() //创建一个文本节点 nodeType = 3
  var text = document.createTextNode("i'm leibaio")
  text.nodeType; //3
  
  normalize() //文本节点的合并
  
  splitText() //文本节点的分隔
  ```

* 添加、移除、替换、插入、复制

  ```js
  appendChild(nodeInsert)	//父节点尾部添加子节点
  removeChild(nodeA)	//移除
  replaceChild(newNode, oldNode)	//替换
  insertBefore()	//插入
  cloneNode(bool) //复制
  ```

* 查找

  ```js
  getElementsByTagName()	//通过标签
  getElementsByName()	//通过Name属性
  getElementById()	//通过元素Id
  ```

### 实现一个函数 clone 可以对 js 中五种主要数据类型进行复制

```js
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
```

### 如何消除一个数组中重复的元素

```js
let arr = [1, 2, 3, 3, 4, 5, 6, 6, 9, 2, 3, 5];
let newArr = [];

// 1. 双重循环，使用 splice
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] === arr[j]) {
      arr.splice(j, 1);
      j--;
    }
  }
}

// 2. 双重循环 使用newArr
for (let i = 0; i < arr.length; i++) {
  let bool = true;
  for (let j = 0; j < newArr.length; j++) {
    if (arr[i] === newArr[j]) {
      bool = false;
    }
  }
  if (bool) {
    newArr.push(arr[i]);
  }
}

// 3. includes 函数判断去重 （※）
for (let i of arr) {
  if (!newArr.includes(i)) {
    newArr.push(i);
  }
}

// 4. filter 循环过滤去重 （※）
arr.filter((val, index) => {
  if (newArr.indexOf(val) < 0) {
    newArr.push(val);
  }
})

// 5. sort 排序去重
arr = arr.sort();
for (let i = 0; i < arr.length; i++) {
  if (i <= arr.length - 1 && arr[i] != arr[i + 1]) {
    newArr.push(arr[i]);
  }
}

// 6. ES6 Array.from() 方法（※）
console.log(Array.from(new Set(arr)));
console.log([...new Set(arr)]);

```

### 写一个返回闭包的函数

闭包：一个函数和它的周围状态捆绑在一起的组合

闭包的理解：本质上就是上级作用域内变量的生命周期因为被下级作用域内引用，而没有被释放，就导致上级作用域内的变量，等到下级作用域执行完以后才正常得到释放。

```js
// 闭包1：函数作为返回值
function test() {
  const a = 1;
  return function() {
    console.log('a', a);
  }
}

const fn = test();
const a = 2;
fn(); // a 1



// 闭包2: 函数作为参数
function test(fn) {
  const a = 1;
  fn();
} 

const a = 2;
function fn() {
  console.log('a', a);
}
test(fn); // a 2
```

### 使用递归完成1到100的累加

```js
function sum(num) {
  if (num === 1) {
    return 1;
  } else {
    return num + sum(num-1);
  }
}
console.log(sum(100)); // 5050
### JavaScript有几种数据类型

最新的 ECMAScript 标准定义了 8 种数据类型

* 7种原始类型，使用 typeof 检查
  * undefined
  * Boolean
  * Number
  * String
  * BigInt
  * Symbol
  * null
* 引用类型：Object


let arr = [1, 2, 3, 4, 5];
arr instanceof Array; //true
Object.prototype.toString.call(arr); //'[object Array]'

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    } 
    test() {
        console.log('this');
    }
}
Object.prototype.toString.call(Person); // '[object Function]'
```

### console.log(1 + '2') 和 console.log(1 - '2')的打印结果

```js
console.log(1 + '2'); // 12
console.log(1 - '2'); // -1
```

### JS 的事件委托是什么，原理是什么

事件委托，也叫事件代理。事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。让自己的所触发的事件，让他的父元素代替执行。

* 适合事件委托的事件：click、mousedown、mouseup、keydown、keyup、keypress
* 不适合的：mousemove，每次都要计算位置，不好把控

```html
  <ul>
    <li>apple</li>
    <li>banana</li>
    <li>pineapple</li>
  </ul>
```

```js
// 事件委托
document.querySelector('ul').onclick = (event) => {
  let target = event.target
  if (target.nodeName === 'LI') {
    console.log(target.innerHTML);
  }
}

// 不使用事件委托
document.querySelectorAll('li').forEach((e) => {
  e.onclick = function() {
    console.log(this.innerHTML);
  }
})
```

### 如何改变函数内部的 this 指针的指向

apply()	call()	bind()

**this 永远指向最后调用它的那个对象。**

apply 接受两个参数，第一个参数就是要指向的 this 对象，第二个对象是函数接收的参数，以数组方式传入（可以把 a 想成 array）。

call() 和 apply() 只有一个区别， call() 接受的是一个参数列表，而apply() 接受的是一个包含多个参数的数组。

call() 和 apply() 改变了函数的 this 上下文后便执行该函数，而 bind() 则是返回改变了上下文后的一个函数。

```js
// apply()
let a = { name: '大成' };
let b = {
  name: '方公子',
  sayName: function () {
    console.log(this.name);
  }
}
b.sayName(); //方公子
b.sayName.apply(a); //大成
```

**注意：**当传第一个参数是 null 或者 undefined 时候，默认指向 window 浏览器下

`````````js
fn.apply(null, [1, 2]); //this指向window
fn.apply(undefined, [1, 2]); //this指向window
`````````

```js
// call()
function fn(...args) {
  console.log(this, args);
}
let obj = {
  name: 'yanagi'
}

fn.call(obj, 1, 2); // this会指向obj
fn(1, 2); // 指向window
```

bind() 和 call() 相似，第一个参数是 this 指向，传入的也是一个参数列表，但 bind 不会立即执行，而是返回一个改变 this 指向后的函数的拷贝，参数可以分多次传

```js
// bind()
function fn(...args) {
  console.log(this, args);
}
let obj = {
  name: 'waman',
}

fn.bind(obj, 'z')('w') // {name: 'waman'} {"z", "w"}
```

实现一个 bind

```js
Function.prototype.mybind = function () {
  // 先将参数转换为数组
  let args = Array.prototype.slice.apply(arguments);
  // 提取参数的第一项，即 this 指向
  let _this = args.shift();
  // 获取当前 this
  let self = this
  // 返回一个当前函数的拷贝
  return function () {
    return self.apply(_this.args)
  }
}
```

使用场景

* 数组合并

```js
// 数组合并
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr3 = [];
[].push.apply(arr1, arr2);
console.log(arr1); // [1, 2, 3, 4, 5, 6]
console.log(arr2); // [4, 5, 6]
console.log(arr3); // []
[].push.apply(arr3, arr1);
console.log(arr3); // [1, 2, 3, 4, 5, 6]
```

* 防抖

```js
function debounce (fn, delay = 500) {
  // 防抖也是闭包的一个应用
  let timer = null
  function f () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay)
  }
  return f
}
```

* 继承

```js
function Father (name) {
  this.name = name;
}

function Son (name) {
  this.age = 23
  Father.call(this, name)
}

let boy = new Son('leibaio')
console.log(boy.name, boy.age); // leibaio 23
```



###  列举几种解决跨域问题的方式，且说明原理

什么是跨域？当协议、子域名、主域名、端口号中任意一个不相同时，都算作不同域。不同域之间相互请求资源，就算跨域。

解决方案以及原理：

1. jsonp：客户端利用 script 标签可以跨域请求资源的性质，向网页中动态插入 script 标签，向服务端请求数据；服务端会解析请求的 url，至少拿到一个回调函数参数，之后将数据放入其中返回客户端；jsonp 不同于平常的 ajax 请求，仅仅支持 get 类型的方式
2. cors：
3. postMessage
4. websocket
5. Node中间件代理
6. nginx反向代理
7. iframe

### 谈谈垃圾回收机制及内存管理

项目中，js中原始数据类型存在栈中，引用数据类型存在堆中。如果存在大量不被释放的内存（堆/栈/上下文），页面性能会被影响。

浏览器JS 具有垃圾回收机制（GC），垃圾收集器会定期找到那些不再继续使用的变量，然后释放内存。

**标记清除：**当变量进入执行环境，被标记为“进入环境”，离开时会被标记为“离开环境”。垃圾回收器会销毁带标记的值并回收他们所占的内存空间。

**Chrome：**“查找引用”，浏览器不定时去查找当前内存的引用，如果没被占用，就会回收。

**ie：**“引用计数法”，当前内存被占用一次，计数累加一次，移除就减一，减到零时，浏览器就会回收。

### 写一个 function，清除字符串前后的空格

```js
// 方法一：replace 正则匹配
// 去除字符串所有空格：str = str.replace(/\s*/g,"")
// 去除两头空格：str = str.replafce(/^\s*|\s*$/g,"")
// 去除左侧空格：str = str.replace(/^\s*/,"")
// 去除右侧空格：str = str.replace(/(\s*$)/g,"")

var str = "  qwe t w asd qwe ";
var str1 = str.replace(/\s*/g, ""); // 所有 
var str2 = str.replace(/^\s*/, ""); // 左侧
var str3 = str.replace(/\s*$/g, ""); // 右侧
var str4 = str.replace(/^\s*|\s*$/g, ""); //两侧
console.log(str); //    qwe t w asd qwe 
console.log(str1);//qwetwasdqwe
console.log(str2);//qwe t w asd qwe 
console.log(str3);//   qwe t w asd qwe
console.log(str4);//qwe t w asd qwe

// 方法二：str.trim() : 删除字符串两端空白并返回，不影响原来字符串，返回新的字符串
// 2. trim()
var str5 = str.trim(); // 两侧
var str6 = str.trimStart();
var str7 = str.trimEnd();
```

### js 实现继承的方法有哪些

原型链继承、构造函数继承（call）、组合继承（call+new）、寄生组合继承（call+寄生式封装）、ES6中class继承

### 判断一个变量是否是数组，有哪些方法

```js
var arr = [1, 2, 3, 4]；
// instanceof
console.log(arr instanceof Array); // true
// constructor
console.log(arr.constructor === Array); // true
console.log(arr.__proto__.constructor === Array); // true
// Array.isArray
Array.isArray(arr); // true
// Object.prototype.toString.call
Object.prototype.toString.call(arr); // "[object Array]"
```

### let、const、var 有什么区别

ES5中，var是定义变量。即时在区域块中声明，仍会在全局中起作用，不具备块级作用域特性。使用var容易造成全局污染（污染 js 的作用域）；ES6中，使用let定义变量，在块级作用域中，let只在局部起作用，let可以防止数据污染；常量使用const定义，定义在块级作用域中，并且const必须赋值。是一种保护性机制。

 let和const特点：不属于顶层window、不存在变量提升、暂时性死区、支持块级作用域；var：相反；

### 箭头函数和普通函数有什么区别

```js
let fn = name => {
  console.log(name);
}
let fn2 = function(name) {
  console.log(name);
}
console.dir(fn);
console.dir(fn2);
```

* 声明方式不同，匿名函数
  - 声明一个普通函数需要使用关键词 function 来完成，并且使用 function 既可以声明成一个具名函数，也可以声明为一个匿名函数
  - 声明箭头函数只要箭头就可以，更加简洁
* this 指向不同。普通函数的 this 指向函数运行时所在的对象，但箭头函数内部的 this 指向是固定的，相比之下，普通函数的 this 是可变的
* 箭头函数的 this 不会改变， call、apply、bind 也无法改变

### 随机取1-10之间的整数

js 可以使用 Math() 实现随机数的生成

| 方法     | 描述           |
| -------- | -------------- |
| ceil(x)  | 向上取整       |
| floor(x) | 向下取整       |
| round(x) | 四舍五入       |
| random() | 随机生成【0,1] |

```js
Math.ceil(Math.random()*10); //随机生成 1-10 之间的整数
Math.floor(Math.random()*10); //随机生成 0-9 之间的整数
Math.round(Math.round()*10); //均衡获得 0-10的随机整数
Math.round(Math.random()); //随机生成 0-1 的随机整数
```

### new 操作符具体干了什么

```js
// new 操作符具体干了什么
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayName = function () {
  console.log(this.name);
}

const person1 = new Person('James', 23);
console.log(person1); // Person {name: "James", age: 23}
person1.sayName(); // James
```

* new 通过构造函数 Person 创建出来的实例可以访问到构造函数中的属性
* new 通过构造函数 Person 创建出来的实例可以访问到构造函数原型链的属性

```js
// 在构建函数中显式加上返回值，并且返回值是一个原始类型
function Test(name) {
  this.name = name;
  return 1;
}
const t = new Test('xxx');
console.log(t); // Test {name: "xxx"}
```

上面构造函数中返回一个原始值，但是结果没有作用

```js
function Test(name) {
  this.name = name;
  console.log(this);// Test {name: "xxx"}
  return {
    age: 26
  }
}
const t = new Test('xxx'); 
console.log(t); //  {age: 26}
console.log(t.name); // undefined
```

构造函数为一个对象，返回值会被正常调用

通过上面介绍， new 做了以下工作：

* 创建一个新的对象 obj
* 将对象与构建函数通过原型链连接起来
* 将构建函数 this 绑定到新建的对象 obj 上
* 根据构建函数返回类型判断，如果是原始值则被忽略，如果是返回对象，需要正常处理

手动实现一个 new

```js
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
```

### Ajax 原理

Ajax 全称 Async JavaScript and XML，异步的  JavaScript 和 XML，可以在不重新加载整个网页的情况下，与服务器交换数据，并且更新部分网页。

原理简单来说，就是通过 XMLHttpRequest 对象向服务器发送异步请求，从服务器获得数据，然后用 JavaScript 来操作 DOM 而更新页面。

<img src="https://pic.rmb.bdstatic.com/bjh/709e79f2c1899fbf67c1f6bee7be2e22.jpeg" alt="image.png"  />

举个例子：领导找小李汇报一下工作，就委托秘书去叫小李，自己接着做其他事情，直到秘书高速他小李已经到了，最后小李汇报工作。

Ajax 请求数据相当于 “领导想找小李汇报工作”，秘书就相当于 XMLHttpRequest 对象，领导相当于浏览器，响应数据相当于小李。浏览器发送 HTTP 请求后，接着做其他事情，直到 XHR 返回数据再进行操作。

#### 实现过程：

实现 Ajax 异步交互需要服务器逻辑进行配合，需要完成以下步骤：

* 创建 Ajax 的核心对象 XMLHttpRequest 对象
* 通过 XHR 对象的 open() 方法与服务端建立连接
* 构建请求所需的数据内容，并通过 XHR 对象的 send() 方法发送给服务端
* 通过 XHR 对象提供的 onreadystatechange 事件监听服务器端的通信状态
* 接受并处理服务端向客户端响应的数据结果
* 将处理结果更新到 HTML 页面中

### 模块化开发怎么做

#### 介绍

模块（Module），是指能够单独命名并独立地完成一定功能的程序语句的集合。

CommonJs（典型代表：node.js 早期）、AMD（Asynchronous Module Definition）（典型代表：require.js）、CMD（典型代表：sea.js）

### slice、splice、split

#### slice

从数组中截取任意个元素，返回结果为新的数组。不改变原来数组。

语法： 新数组 = 原数组.slice(开始位置的索引，结束位置的索引); [a, b)

```js
// slice: 截取，不改变原数组
const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
console.log(arr.slice()); // 无参数截取所有
console.log(arr.slice(2)); // 从第二个到末位
console.log(arr.slice(-2)); // 截取最后两个。 -2 + 6 = 4
console.log(arr.slice(2, 4)); // 第二个到第四个（不包括第四个）
console.log(arr.slice(4, 2)); // 空
```

ES6 版

```js
array = Array.from(arr);
```

#### splice

从数组中删除任意个元素（可以是负的，即增加）。返回结果为被删除元素组成的新数组。 会改变原数组。

语法： 新数组 = 原数组.splice(起始索引index，需要删除的个数);

 新数组 = 原数组.splice(起始索引index，需要删除的个数, 新的元素1, 新的元素2 ...)；

```js
// splice：
var arr1 = ['a', 'b', 'c', 'd', 'e', 'f'];
// console.log(arr1.splice(1)); //从index为1的地方开始删除元素
// console.log(arr1.splice(-2)); // 删除最后两个元素
// console.log(arr1.splice(1, 3)); // 从index为1的地方删除到 index为3的
//增加系列
// console.log(arr1.splice(0, 0, 'g', 'h'));
// console.log(arr1.splice(0, 2, 'vue', 'h'));
```

#### split

```js
新的数组 = str.split(分隔符)；
```

### 异步加载 js 方式有哪些

#### 回调函数

````js
const fs = require('fs');
fs.readFile('./package.json', (err, info) => {
  fs.writeFile('./p.json', info, (err) => {
    if (!err) {
      setTimeout(() => {
        console.log('ok')
      }, 2000);
    }
  })
})
````

通过回调函数嵌套，从文件系统中读取一个 ./package.json 文件并写入 ./p.json，读取后两秒后输出 'ok'。如果添加多个异步函数，代码可读性会变差，修复过程也困难，这就是 回调函数地狱

#### Promise

三个状态：成功 Fulfilled、失败 Rejected、处理中 Pending

默认 Pending 如果调用 resolve fulfilled

默认 Pending 如果调用 reject rejected

```js
const fs = require('fs');
const { setTimeout } = require('timers/promises');
const promise1 = new Promise((resolve, reject) => {
  fs.readFile('./package.json', (err, info) => {
    resolve(info);
  })
})
const promise2 = (info) => {
  new Promise((resolve, reject) => {
    fs.writeFile('./p.json', info, (err) => {
      if (!err) {
        resolve();
      } else {
        reject();
      }
    })
  })
}
const promise3 = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  })
}
// then 链式调用
// 读文件成功，结果作为参数传入 promise2
promise1.then((info) => {
  return promise2(info);
}).then(() => {
  // 等待前面的promise
  console.log('读写完成');
  return promise3(2000)
}).then(() => {
  console.log('ok');
})
```

#### async + await 语法糖

```js
async function run() {
  let info = await promise1;
  await promise2(info);
  await promise3(2000);
  console.log('ok')
}
```

使用 async + await 代替了 .then() 方法

async 必须在函数声明前，await 接一个 promise，后面的代码就会等待，等到 resolve 才运行

### XML 和 JSON 的区别

* 数据体量方面，JSON 数据体量更小，传输速度更快
* 数据交互方面，JSON 与 js 的文本更加方便，交互方式更加灵活
* 数据描述方面，JSON 对数据的描述性比 XML 差
* 传输速度方面，JSON 要远快于 XML

### Webpack 如何实现打包

require 是运行时调用，因此理论上可以放在代码任何地方；import 是编译时调用，因此必须放在文件开头

### 随机取 1-10 之间的整数

利用 floor 函数向下取整

```js
let randomIntNum = Math.floor(Math.random() * 10 + 1)

console.log(randomIntNum)
```

### BFC

块格式化上下文。是一块独立的布局环境，保护其内部元素不受外部影响，也不影响外部。本身 BFC 是一种 CSS 布局方式，我们可以利用它来解决外边距折叠问题。

### 回流和重绘

引起元素位置变化的就会 reflow，比如窗口大小改变、字体大小改变、元素位置变化等会引起周围元素变化的；不会引起位置变化的，还是在以前位置的，比如更改背景颜色的，只会 repaint

### 微任务 宏任务

微任务和宏任务是**异步任务**的两个分类。

* 宏任务：当前调用栈中执行的代码成为宏任务。（主代码块，定时器等）。

* 微任务：当前（此次事件循环中）宏任务执行完，下一个宏任务开始之前需要执行的任务，可以理解为回调事件。（Promise.then，nextTick 等）

宏任务一般是：包括整体代码 `script`，`setTimeout`，`setInterval`、`I/O`、`UI render`。
微任务主要是：`Promise`、`Object.observe`、`MutationObserver`。



**顺序：**

第一步，先按同步代码顺序运行

第二步，开始清空微任务队列

第三步，开始清空宏任务队列（执行一个宏任务，把相关微任务添加入微任务队列）

第四步：开始清空微任务队列（上一个执行宏任务中加入队列的微任务一次性全部执行完成）

第五步：开始清空宏任务队列（执行下一个宏任务，把相关微任务添加入微任务队列）

.......... 循环一直到执行完成



**举例：**

```js
console.log('sync statement 1')
Promise.resolve().then(function() {
    console.log('micro task 1')
    setTimeout(function() {
        console.log('macro task 1')
    }, 0)
}).then(function() {
    console.log('micro task 2')
})

setTimeout(function() {
    console.log('macro task 2')
    Promise.resolve().then(function() {
        console.log('micro task 3')
    })
}, 0)

console.log('sync statement 2')
```

执行结果：

```bash
> sync statement 1
> sync statement 2
> micro task 1
> micro task 2
> macro task 2
> micro task 3
> macro task 1
```

### nextTick

微任务，将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。

### DOM 操作

Document Object Model，文档对象模型，有`文档`、`元素`、`节点`这样几个概念。

整个文档是一个文档节点，每个标签是一个元素节点，包含在元素中的文本是文本节点，元素上的属性是属性节点，文档中的注释是注释节点。

**DOM 本质是 DOM 树：**DOM 树是结构，树是由 DOM 元素和属性节点组成的，DOM 的本质是把 HTML 结构化成 JS 可以识别的树模型；有了树模型，就有了层级结构，层级结构是指元素和元素之间的关系，父子、兄弟

下面是 HTML 文档：

```html
<html>
    <head>
        <title>文档标题</title>
    </head>
    <body>
	    <a href="#">链接</a>
        <h1>标题</h1>
    </body>
</html>
```

DOM 树如下：

![image.png](https://pic.rmb.bdstatic.com/bjh/1e32552c415cce7ba4ac075d5dffe23a.jpeg)

**DOM 节点操作：**

```html
<html>
    <div class="father">
        <div id="box" class ="item" name="myBox">asdzxcqwe</div>
    </div>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
</html>

```

```css
#box {
    width: 100px;
    height: 100px;
}

.item {
    background-color: #fff
}
```

* DOM 获取

```js
// 通过 id 获取单个元素
let oBox = document.getElementById('box')
console.log(oBox) // <div id="box" class="item" style="background-color: black; width: 200px; color: white;"><h1>hello</h1></div>


// 通过 class 获取一组元素
let oBox2 = document.getElementsByClassName('item')
console.log(oBox2) // 

console.log(oBox == oBox2[0]) // true

// 通过 TagName 获取到是一组元素，同上
let oBox3 = document.getElementsByTagName('div')[0]
console.log(oBox3) // <div id="box" class="item" style="background-color: black; width: 200px; color: white;"><h1>hello</h1></div>

// 通过 name 获得的 NodeList 
let oBox4 = document.getElementsByName('myBox')
console.log(oBox4) // NodeList [div#box.item]

// h5 新增两种
// 获取单个
let item = document.querySelector('.item')
// 获取组合
let items = document.querySelectorAll('.item')
console.log(item) // <div id="box" class="item" name="myBox" style="background-color: black; width: 200px; color: white;"><h1>hello</h1></div>
console.log(items) // NodeList [div#box.item]

// body
let body = document.body

// html
let html = document.documentElement
```

* 添加节点

````js
let fa = document.querySelectorAll('.father')[0]

// 创建文本节点
let text = document.createTextNode('hello')
// 创建元素节点
let tag = document.createElement('H1')

tag.appendChild(text)
fa.appendChild(tag)
````

* 删除节点

```js
// 获取父元素
let oUl = document.querySelector('ul')
// 获取子元素
let oLi = document.querySelectorAll('li')[1]

oUl.removeChild(oLi)
```

* 替换节点

```js
// 获取父元素
let oUl = document.querySelector('ul')
// 获取子元素
let oLi = document.querySelectorAll('li')

oUl.replaceChild(oLi[1], oLi[2])
```

* 插入

```js
// 获取父元素
let oUl = document.querySelector('ul')
// 获取子元素
let oLi = document.querySelectorAll('li')

let other = document.createElement('h1')
other.innerText = 'qweasdzxc'

oUl.insertBefore(other, oLi[0])
```

### DOM 相关问题：

1. DOM 常用 API ?
   * 获取 DOM 节点，以及节点的 Property 和 Attribute
   * 获取父节点和子节点
   * 新增、删除节点
   
2. DOM 节点的 Property 和 Attribute 区别
   * Property 是一个 JS 对象的属性的修改
   * Attribute 是对 HTML 标签属性的修改
   
3. DOM 属性优化

   将频繁的操作改为一次性操作，通过创建文档碎片，最后一次性加入文档碎片

   ```js
   const listNode = document.getElementById('list')
   
   // 创建一个文档片段，此时还没有插入到 DOM 树
   const frag = document.createDocumentFragment()
   
   // 执行插入
   for (let x = 0; x < 10; x++) {
       const li = document.createElement('li')
       li.innerHTML = 'List item ' + x
       frag.appendChild(li)
   }
   
   // 都完成之后，再插入 DOM 树中
   listNode.appendChild(frag)
   ```

## 一行 JS https://1loc.dev/

### Array

1. Cast a value as an array（将值转为数组）

```js
const castArray = (value) => (Array.isArray(value) ? value : [value])

console.log(castArray(1))
console.log(castArray([1, 2, 3]))

> [1]
> [1,2,3]
```

2. Check if an array is empty（检查数组是否为空）

```js
const isEmpty = (arr) => Array.isArray(arr) && !arr.length

console.log(isEmpty([]))
console.log(isEmpty([1, 2]))

> true
> false
```

3. Clone an array（克隆数组）

```js
const clone = (arr) => arr.slice(0)

// Or
const clone = (arr) => [...arr]

// Or
const clone = (arr) => Array.from(arr)

// Or
const clone = (arr) => arr.map((x) => x)

// Or
const clone = (arr) => JSON.parse(JSON.stringify(arr))

// Or
const clone = (arr) => arr.concat([])

// Or
const clone = (arr) => structuredClone(arr)
```

4. Compare two arrays regardless of order（比较两个数组无视顺序）

```js
const isEqual = (a, b) => JSON.stringify([...new Set(a)].sort()) === JSON.stringify([...new Set(b)].sort())
console.log(isEqual([1, 2, 3, 4, 5], [1, 2, 3, 5, 4]))
console.log(isEqual([1, 2, 3, 4, 5], [1, 2, 3, '5', 4]))

> true
> false
```

5. Compare two arrays（比较两个数组）

```js
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

console.log(isEqual([1, 2, 3], [1, 2, 3]))
console.log(isEqual([1, 2, 3], [1, 2]))

> true
> false
```

6. Convert an array of objects to a single object（将对象数组转换为单个对象）

```js
// vreduce() 方法接收一个函数作为累加器，数组中每个值（从左到右）开始缩减，最终计算为一个值

const toObject = (arr, key) => arr.reduce((a, b) => ({...a, [b[key]]: b}), {})

console.log(toObject(
    [
        {id: '1', name: 'Alpha', gender: 'Male'},
        {id: '2', name: 'Bravo', gender: 'Male'}
    ],
    'id'
))

> {"1":{"id":"1","name":"Alpha","gender":"Male"},"2":{"id":"2","name":"Bravo","gender":"Male"}}
```

7. Convert an array of strings to numbers（将字符串数组转换为数字数组）

```js
// map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成

const toNumbers = (arr) => arr.map(Number)

// Or

const toNumbers = (arr) => arr.map((x) => +x)

console.log(toNumbers(['1', '2', '3']))

> [1,2,3]
```

8. Count by the properties of an array of objects（按对象数组的属性计数）

