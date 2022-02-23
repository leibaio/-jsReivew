$(document).ready(function() {

  // 三种方式获取jquery对象
  var jqBox1 = $("#box");
  var jqBox2 = $(".box");
  var jqBox3 = $("div");

  // 操作标签选择器，可隐式迭代

  // jqBox3.css("width", 100);
  // jqBox3.css("height", 100);
  // jqBox3.css("margin", 10);
  // jqBox3.css("background", "pink");

  jqBox3.css({"width": 100, "height": 100, "margin": 10, "background": "pink"});

  // 操作类选择器
  jqBox2.css({"background": "yellow"})

  // 操作id选择器
  jqBox1.css({"background": "red"});

})