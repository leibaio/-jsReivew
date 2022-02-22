const object = {};
const array = [];

console.log('result object(typeof) -', typeof object);
console.log('result array(typeof) -', typeof array);

const flagObject = object instanceof Array;
const flagArray = array instanceof Array;

console.log('result object(instanceof) -', flagObject);
console.log('result array(instanceof) -', flagArray);

// 使用instanceof 当在对象原型链上能找到类的prototype，则为true
