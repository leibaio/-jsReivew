// Promise 的常用API分类，Promise的实例方法：promise.then() promise.catch() promise.finally()

// Promise的静态方法:
// Promise.resolve()
// Promise.reject()
// Promise.all()  并发处理多个异步任务，所有任务都执行成功，才算成功（走到resolve）；只要有一个失败，就马上走到reject，整体都算失败  
// Promise.race() 并发处理多个异步任务，返回的是第一个执行完成的promise，且状态和第一个完成的任务状态保持一致
// Promise.allSettled() 并发处理多个异步任务，返回所有任务的执行结果（包括成功、失败）。当多个彼此不依赖的异步任务执行完成后，或者想知道每个promise 的结果，通常使用它
// Promise.any()

