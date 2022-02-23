$(document).ready(function () {
  // 需求：鼠标放入一级li中，让里面ul显示。移开隐藏
  var jqLi = $(".wrap>ul>li");

  // 绑定事件
  jqLi.mouseenter(function () {
    $(this).children("ul").show(50);
  });

  // 绑定事件：移开隐藏
  jqLi.mouseleave(function () {
    $(this).children("ul").hide(50);
  })
})