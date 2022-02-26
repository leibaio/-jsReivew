// async await 异步函数
// 本质是Generator的语法糖，async的返回值是Promise的实例对象，await可以得到异步结果。在普通的函数前面加上async关键字，就变成了async函数

// async await 基本用法
// const request1 = function() {
//   const promise = new Promise((resolve, reject) => {
//     if (responde.retCode == 200) {
//       resolve('request1 success' + response)
//     } else {
//       reject('接口请求失败');
//     }
//   })

//   return promise;
// }

// async function queryData() {
//   const response = await request1();
//   return response;
// }
// queryData().then(data => {
//   console.log(data);
// })


// // async 起什么作用
// async function testAsync() {
//   return "hello async";
// }

// const result = testAsync();
// console.log(result); //  Promise {<fulfilled>: 'hello async'}
// // async 函数返回的是一个Promise对象，所以所以在最外层不能用await获取其返回值的情况下，应当用 then() 方式处理Promise对象

// testAsync().then(v => {
//   console.log(v); // 输出hello async
// })


// function testAsync1() {
//   return "hello async1";
// }
// console.log(testAsync1()); // hello async1


// // async/await 棒我们干了什么
// function takeLongTime() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("long_time_value")
//     }, 1000);
//   })
// }

// // takeLongTime().then(v => {
// //   console.log("got", v);
// // })

// // 如果该用 async / await

// async function test() {
//   const v = await takeLongTime();
//   console.log("got" , v);
// }

// test();




// async await 的优势在于处理 then 链
// 传入参数n，表示这个函数执行的时间，执行结果是n+200，这个值用于下一步骤

function takeLongTime(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(n + 200), n);
  })
}

function step1(n) {
  console.log(`step1 with ${n}`);
  return takeLongTime(n);
}

function step2(n) {
  console.log(`step2 with ${n}`);
  return takeLongTime(n);
}

function step3(n) {
  console.log(`step3 with ${n}`);
  return takeLongTime(n);
}

// 使用Promise方式实现三个步骤处理
// function doIt() {
//   console.time("doIt");
//   const time1 = 300;
//   step1(time1)
//       .then(time2 => step2(time2))
//       .then(time3 => step3(time3))
//       .then(result => {
//         console.log(`result is ${result}`);
//         console.log('doIt');
//       })`
// }


// 如果使用async await
async function doIt() {
  console.time('doIt');
  const time1 = 300;
  const time2 = await step1(time1);
  const time3 = await step2(time2);
  const result = await step3(time3);
  console.log(`result is ${result}`);
  console.timeEnd("doIt")
}
doIt();
