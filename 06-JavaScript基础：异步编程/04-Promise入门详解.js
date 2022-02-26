// ES6 中的 Promise 是异步编程的一种方案。从语法上讲，Promise是一个对象，它可以获取异步操作的消息
// Promise的伪代码
// myPromise() {
//   .then{
//     function () {},
//     function () {}
//   }
//   .then{
//     function () {},
//     function () {}
//   }
//   .then{
//     function () {},
//     function () {}
//   }
// };

// 伪代码2
// 是时候展现真正的厨艺了().然后(买菜).然后(做饭).然后(洗碗);

// 使用 Promise 的基本步骤：（1）通过 new Promise() 构造出一个 Promise 实例。Promise 的构造函数中传入一个参数，这个参数是一个函数，用于处理异步任务。
// （2）函数中传入两个参数：resolve 和 reject，分别表示异步执行成功后的回调函数和异步执行失败之后的回调函数。代表我们需要改变当前实例的状态到已完成或者已拒绝
// （3）通过 promise.then() 和 promise.catch() 处理返回结果

// promise 对象的3个状态
// 初始化（等待中）：pending；     成功：fulfilled；    失败：rejected


// 创建 promise 实例
// let promise = new Promise((resolve, reject) => {
//   // 进来之后，状态为 pending
//   console.log('同步代码');
//   // 开始执行异步操作（从这里开始执行异步操作，比如ajax请求或者开启定时器）
//   if (异步的ajax请求成功) {
//     console.log('333');
//     resolve('请求成功，并传参'); // 如果请求成功，写resolve()，此时promise的状态会自动修改为fulfilled（成功状态）
//   } else {
//     reject('请求失败，并传参'); // 如果请求失败，写reject()，此时promise状态会变为 rejected（失败状态）
//   }
// });
// console.log('222');

// // 调用promise的then()， 开始处理成功或失败
// promise.then(
//   (successMsg) => {
//     // 处理 Promise 的成功状态，如果promise的状态为fulfilled，执行这里的代码
//     console.log(successMsg, '成功了'); // 这里的 successMsg 是前面resolve传来的参数
//   },
//   (errorMsg) => {
//      //处理 promise 的失败状态：如果promise的状态为rejected，则执行这里的代码
//      console.log(errorMsg, '失败了'); // 这里的 errorMsg 是前面的 reject('请求失败，并传参') 传过来的参数
//   }
// )

// new Promise () 是本身同步代码。promise 如果没有使用 resolve 或 reject 更改状态时候，状态为 pending
// // 举例1
// const promiseA = new Promise((resolve, reject) => {})
// console.log(promiseA);
// 上面这段代码，既没有写 resolve()，也没有写 reject()。意味着这个promise一直处于准备阶段。 当完成异步任务后，状态分为成功或者失败，就可以使用 resolve() 和 reject() 来修改 promise 的状态



// 举例2 
// new Promise((resolve, reject) => {
//   console.log('promise1'); // 这段代码是同步代码
// }).then((res) => {
//   console.log('promise then:' + res);// 这段代码不会执行，因为前面没有加resolve(),.then是不会执行的
// })


// 举例3
// new Promise((resolve, reject) => {
//   resolve();
//   console.log('promise1'); // 代码1， 同步任务
// }).then(res => {
//   console.log('promise then'); // 异步任务
// })

// console.log('promise');


// promise 的状态一旦改变，就不能更改。举例
// const p = new Promise((resolve, reject) => {
//   resolve(1); // 代码执行到这里，promise 的状态是  fulfilled
//   reject(2); // 尝试修改状态为 rejected，无法修改
// });

// p.then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// });



// Promise 封装异步任务
// 定义一个异步的延迟函数：异步函数结束1秒之后，再执行

// function myPromise() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve()
//     }, 1000);
//   });
// }

// // 先执行异步函数 myPromise, 再执行回调函数
// myPromise().then(() => {
//   console.log(`我是延迟执行的回调函数`);
// })


// Promise 封装 Ajax 请求
// function ajax(url, success, fail) {
//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.open('GET', url);
//   xmlhttp.send();
//   xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
//       success && success(xmlhttp.responseText);
//     } else {
//       // && ，如果传了fail参数使用后面的fail(),如果没传，就不调用
//       fail && fail(new Error('接口请求失败'))
//     }
//   }
// }

// // 执行ajax请求
// ajax(
//   '/a.json',
//   (res) => {
//     console.log('第一个请求成功' + JSON.stringify(res));
//   },
//   (err) => {
//     console.log('请求失败' + JSON.stringify(res));
//   }
// )


// Promise写法
// 封装 ajax 请求：传入回调函数 success 和 fail
function ajax(url, success, fail) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', url);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          success && success(xmlhttp.responseText);
      } else {
          // 这里的 && 符号，意思是：如果传了 fail 参数，就调用后面的 fail()；如果没传 fail 参数，就不调用后面的内容。因为 fail 参数不一定会传。
          fail && fail(new Error('接口请求失败'));
      }
  };
}

// 第一步：model层的接口封装
// function promiseA() {
//   return new Promise((resolve, reject) => {
//     ajax('xxx_a.json', (res) => {
//       // res是接口返回结果，返回码 resCode 是动态数据
//       if (res.resCode == 0) {
//         //接口请求成功时调用
//         resolve('request success' + res); 
//       } else {
//         reject({ retCode: -1, msg: `network error` })
//       }
//     })
//   })
// }

// // 第二步：业务层的接口调用，data就是从 resolve 和 reject 拿来的数据
// promiseA().then((res) => {
//   // 从resolve返回正常结果：接口请求成功，打印接口返回结果
//   console.log(res);
// }).catch((err) => {
//   // 从reject获取异常结果
//   console.log(err);
// })


// 处理reject失败状态的写法: 写法1:通过catch方法捕获 状态已经变为 reject 时的 promise
// 第一步：model层的接口封装
// function promiseA() {
//   return new Promise((resolve, reject) => {
//     // 进行异步任务（比如ajax，定时器等）

//   })
// }

// const onResolve = function (res) {
//   console.log(res);
// }

// const onReject = function (err) {
//   console.log(err);
// }

// // 写法1 
// promiseA().then(onResolve).catch(onReject);

// 举例
function promiseA() {
  return new Promise((resolve, reject) => {
    // 异步函数
    setTimeout(() => {
      reject(2);
      resolve(21);
    }, 1000);
  })
}

promiseA().then((res) => {
  // 从resolve获取正常结果
  console.log('接口请求成功');
  console.log(res);
}).catch((err) => {
  console.log('接口请求失败');
  console.log(err);
}).finally(() => {
  console.log(`无论情况如何，都会走到这里`);
})