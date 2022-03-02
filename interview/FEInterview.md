#### 简述同步和异步的区别

同步是阻塞模式，异步是非阻塞模式。

同步是指同一个进程在执行某个请求时，若该请求需要一段时间才能返回信息，那么进程会一直等待下去，直到收到返回信息后才继续执行。

异步是指进程不需要一直等待，而是继续执行下面的操作，不管其他进程。当有消息返回，系统进行处理，提高执行效率。

#### 怎么添加、移除、复制、创建和查找节点？

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
  cloneNode(bool)
  ```

* 查找

  ```js
  getElementsByTagName()	//通过标签
  getElementsByName()	//通过Name属性
  getElementById()	//通过元素Id
  ```

#### 实现一个函数 clone 可以对 js 中五种主要数据类型进行复制

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

#### 如何消除一个数组中重复的元素
