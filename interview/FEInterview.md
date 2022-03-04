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

call()	apply()	bind()

**this 永远指向最后调用它的那个对象。**

call() 和 apply() 只有一个区别， call() 接受的是一个参数列表，而apply() 接受的是一个包含多个参数的数组。

call() 和 apply() 改变了函数的 this 上下文后便执行该函数，而 bind() 则是返回改变了上下文后的一个函数。

```js
let obj = { name: 'tony' };

function Child(name) {
  this.name = name;
}

Child.prototype = {
  constructor: Child,
  showName: function() {
    console.log(this.name);
  }
}

var child = new Child('thomas');
child.showName();

// call apply bind 用法
child.showName.call(obj);
child.showName.apply(obj);
let bind = child.showName.bind(obj); //返回一个函数
bind();
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

原型链继承、构造函数继承、组合继承、寄生组合继承、ES6中class继承

### 判断一个变量是否是数组，有哪些方法

