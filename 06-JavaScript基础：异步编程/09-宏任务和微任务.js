// 在执行一个Promise对象的时候，当走完 resolve(); 之后就会立即把 .then() 里面的代码加入到微任务队列中

// 任务的一般执行顺序：同步任务 -> 微任务 -> 宏任务

// 代码举例1: 宏任务和微任务的执行顺序

setTimeout(() => {
  //宏任务
  console.log('setTimeout');
}, 0);

new Promise((resolve, reject) => {
  resolve();
  console.log('promise1'); // 同步任务
}).then((res) => {
  //微任务
  console.log('promise then')
});

console.log('leibaio'); // 同步任务

// promise1
// qianguyihao
// setTimeout
// promise then