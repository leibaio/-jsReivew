let arr = [1, 2, 2, 3, 4, 5, 3, 2, 1];
console.log(arr);

let aaa = oSort(arr);
console.log(aaa);
// 思路：创建一个空数组，用来保存最终结果；循环原数组的每个元素；再对每个元素进行二次循环，判断是否有相同的元素，没有再加入；返回这个新数组

function oSort(array) {
  let res = [];
  let newArr = [];

  for (let i = 0; i < array.length; i++) {
    let bool = true;

    for (let j = 0; j < newArr.length; j++) {
      if (array[i] === newArr[j]) {
        bool = false;
      }
    }

    if (bool) {
      newArr[newArr.length] = array[i];
    }
  }
  return newArr;
}