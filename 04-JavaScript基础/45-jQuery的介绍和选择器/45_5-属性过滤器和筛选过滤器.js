$(function () {
  var jqUl = $("ul");

  // find(selector); 从jquery对象后代中查找；必须制订参数，如果获取不到元素. length === 0;
  jqUl.find("li").css({"background": "pink"});
  console.log(jqUl.find());

  // children(selector);  从jquery对象的子代中查找该索引值的元素；不写代表获取所有子代
  jqUl.children("li").css({"background": "yellow"});

  // eq(索引值)：从jquery对象的子代中查找该索引值的元素
  jqUl.children().eq(0).css("background", "red");

  // next(); 该元素的下一个兄弟元素
  jqUl.children().eq(0).next().css("background", "blue");

  // siblings(selector); 该元素的所有兄弟元素
  jqUl.children().eq(0).siblings().css("border", "1px solid blue");

  // parent(); 元素的父元素
  console.log(jqUl.children().eq(0).parent());

})