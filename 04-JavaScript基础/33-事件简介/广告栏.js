    // 需求：点击按钮，隐藏盒子 

    // 1.获取事件源和相关元素
    var closeBanner = document.getElementById("closeBanner");
    var topBanner = document.getElementById("topBanner");
    // 2.绑定事件
    closeBanner.onclick = function() {
      topBanner.className = "hide"; // 方式一
      // topBanner.style.display = "none"; 方式二，效果相同
    }