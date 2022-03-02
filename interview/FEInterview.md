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
```

