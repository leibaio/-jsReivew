$(function () {
  // 需求：隔行变色，鼠标悬停时变色
  var jqLi1 = $("li:odd");
  var jqLi2 = $("li:even");
  jqLi1.css("background", "pink");
  jqLi2.css("background", "white");

  // 鼠标悬停变色
  var color = "";
  $("li").mouseenter(function () {
    color = $(this).css("background"); //先记录之前的颜色，鼠标离开还原
    $(this).css("background", "blue");
  })

  $("li").mouseleave(function () {
    $(this).css("background", color);
  });


})