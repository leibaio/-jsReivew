$(window).ready(function () {
  //需求：鼠标放入li中，其他li半透明，当前盒子opacity为1
  $(".wrap").find("li").mouseenter(function () {
    $(this).css("opacity", 1).siblings("li").css("opacity", 0.4);
  });

  // 离开时li都为1 
  $(".wrap").mouseleave(function () {
    $(".wrap li").css("opacity", 1);
  })
})