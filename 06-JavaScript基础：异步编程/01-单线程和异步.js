// 单线程，所谓单线程，是指引擎中负责解释和执行JavaScript代码的线程只有一个，也就是这个任务完成才能进行下一个。所有任务都要排队。

// 同步任务：在主线程上排队执行的任务。只有前一个任务执行完毕，才能执行下一个任务。 异步任务：不进入主线程、而是进入任务队列的任务。

// 异步任务：不进入主线程、而是进入任务队列。只有 “任务队列” 通知主线程，某个异步任务才可以执行，该任务才会进入主线程执行

// console.log('同步任务1');

// setTimeout(() => {
//   console.log('异步任务');
// }, 1000);

// console.log('同步任务2');

// 同步任务1
// 同步任务2
// 异步任务

// 代码解释：第一行代码是同步任务，会立即执行；定时器的回调函数是异步任务，需要等 1 秒后才会执行。如果定时器是同步任务，需要等待一秒后，才能执行最后一行，造成主线程阻塞。    比如说：网络图片的请求，就是一个异步任务。如果同时请求多个图片，谁先请求谁先显示，加入做成同步任务，就会出现大问题。

// 前端使用异步的场景：什么时候需要等待，就什么时候用异步。常见的异步场景如下：
// 1、定时器：setTimeout（定时炸弹）、setInterval（循环执行）
// 2、事件绑定
// 3、网络请求（包含接口请求）：ajax请求、网络图片加载
// 4、ES6中的Promise

// 接口调用的方式：原生ajax、基于jQuery的ajax、Promise、Fetch、axios

// 事件循环机制：执行顺序如下：同步任务：进入主线程后，立即执行
// 异步任务：会先进入 Event Table；等到了时间后，再进入Event Queue，然后排队
// 当主线程的任务执行完毕后，此时主线程属于空闲状态，于是会读取Event Queue的任务队列，如果有任务，到主线程执行

// 定时器：举例1
// console.log(1);

// setTimeout(() => {
//   console.log(2);
// }, 1000);

// console.log(3);
// console.log(4);\

// 执行结果 1 3 4 2


// 举例2：如果把等待时间从 1 秒 改为 0 秒
// console.log(1);

// setTimeout(() => {
//   console.log(2);
// }, 0);

// console.log(3);
// console.log(4);

// 执行结果依然是 1 3 4 2 。 事件循环机制，先等同步任务执行完后，再执行异步任务

// setTimeout(() => {
//   console.log('异步任务');
// }, 2000);

// 伪代码
// sleep(5000); //表示很耗时的同步任务
// 2秒的时候从Event Table 进入 Event Queue，5秒主线程任务执行完毕，开始执行Event Queue过来的异步任务，所以是从5s执行

// 较真系列
// setTimeout(() => {
//   console.log('异步任务');
// }, 1000);
// 在浏览器中，setTimeout()/ setInterval() 的每调用一次定时器的最小时间间隔是4毫秒，这通常由于函数嵌套导致，或者由于已经执行的setInterval 的回调函数阻塞导致。所以上面的案例要等到1004毫秒之后，才会从 Event Table 进入 Event Queue


// 异步任务举例
// 例1 加载图片
// function loadImage(file, success, fail) {
//   const img = new Image();
//   img.src = file;
//   img.onload = () => {
//     //图片加载成功
//     success(img);
//   };
//   img.onerror = () => {
//     // 图片加载失败
//     fail(new Error(`img load fail`));
//   };
// }

// loadImage(
//   '../04-JavaScript基础/45-jQuery的介绍和选择器/img/01.jpg', 
//   (img) => {
//     console.log('图片加载成功');
//     document.body.appendChild(img);
//     img.style.border = 'solid 2px red';
//   },
//   (error) => {
//     console.log('图片加载失败');
//     console.log(error);
//   }
// )

// 举例：定时器计时，移动DOM元素
// 封装一个定时器，每个间隔delay后，执行callback回调函数
function myInterval(callback, delay = 100) {
  let timeId = setInterval(() => callback(timeId), delay)
}

myInterval((timeId) => {
  // 每间隔 500毫秒之后，向右移动 .box 元素
  const myBox = document.getElementsByClassName('box')[0];
  const left = parseInt(window.getComputedStyle(myBox).left);
  myBox.style.left = left + 20 + 'px';
  if (left > 300) {
      clearInterval(timeId);

      // 每间隔 10 毫秒之后，将 .box 元素的宽度逐渐缩小，直到消失
      myInterval((timeId2) => {
          const width = parseInt(window.getComputedStyle(myBox).width);
          myBox.style.width = width - 1 + 'px';
          if (width <= 0) clearInterval(timeId2);
      }, 10);
  }
}, 200);