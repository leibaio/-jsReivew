//  同步：必须等待前面任务完成，才能继续进行后面任务；异步：不受当前任务影响

// Ajax，Ajax 的核心是 js 对象：XMLHttpRequest
// 一个完整的 http 请求步骤：请求的网址、请求方法 get/post；提交请求的内容数据、请求主体等；接收响应回来的内容

// 发送 Ajax 请求的五个步骤：
// （1）创建异步对象，即XMLHttpRequest对象；  （2）使用open方法设置请求参数；（3）发送请求send()；（4）注册事件；（5）服务端响应，获取返回的数据


// XMLHttpRequest 对象详解
// 发送请求：open(method, url, async);
// method: 请求的类型 GET 或 POST；url：文件在服务器上的位置；async：true或false
// 另外还有一个方法：send(string) 仅限于POST请求


// POST请求时，如果想让像form表单提交数据那样使用POST请求，需要使用XMLHttpRequest对象的 setRequestHeader()方法添加HTTP头。然后在send()方法中添加想要发送的数据
// xmlhttp.open('POST', 'ajax_test.php', true);
// xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// xmlhttp.send('name=smyhvae&age=27');

// onreadystatechange 事件
// 注册 onreadystatechange 事件后，每当readyState 属性改变时，就会调用 onreadystatechange 函数。
// readyState：（存有 XMLHttpRequest 的状态。从0到4发生变化）
// 0:请求未初始化；1：服务器已经建立连接；2：请求已经接收；3: 请求处理中；4: 请求已经完成，且响应就绪；
// status：200:'OK' ; 404: 未找到页面

// 服务器响应的内容：responseText：获得字符串形式的响应数据；responseXML：获得XML形式的响应数据

// 手写一个Ajax: 按照上方五个事件
// get请求
// var xmlhttp = new XMLHttpRequest();
// xmlhttp.open('get', '02-ajax.php');
// xmlhttp.send();
// xmlhttp.onreadystatechange = function () {
//   // 为了保证 数据 完整返回，一般会判断两个值
//   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//     console.log('数据返回成功' + JSON.stringify(xmlhttp.responseText));
//   }

//   // 伪代码：按照业务需求，返回接口内容
//   document.querySelector('h1').innerHTML = xmlhttp.responseText;
// }

// POST 请求

