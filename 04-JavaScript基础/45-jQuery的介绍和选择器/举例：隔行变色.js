// 入口函数
$(function () {
  var jqLi = $("li");
  for (var i = 0; i < jqLi.length; i++) {
    if (i % 2 === 0) {
      // jquery对象，转化为js对象
      jqLi[i].style.backgroundColor = 'pink';
    } else {
      jqLi[i].style.backgroundColor = 'yellow';
    }
  }
})