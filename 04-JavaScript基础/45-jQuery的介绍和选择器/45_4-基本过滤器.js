// :odd（奇数行选择器） :even（偶数行选择器）  :eq(index) 相等选择器

$(document).ready(function () {
  // :odd
  $("li:odd").css({"background": "red"});

  // :even
  $("li:even").css({"background": "blue"});

  // :eq(index)
  $("ul li:eq(3)").css({"font-size": "30px"});
})