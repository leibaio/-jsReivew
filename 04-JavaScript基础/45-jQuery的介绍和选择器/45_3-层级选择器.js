// jQuery层级选择器 => 子代选择器(>) 后代选择器(空格)

$(function () {
  // 获取ul中的li设置为粉色
  // 后代
  var jqLi = $("ul li");
  jqLi.css({"margin": 5, "background": "pink"});
  
  // 子代
  var jqOtherLi = $("ul>li");
  jqOtherLi.css({"background": "red"});
});