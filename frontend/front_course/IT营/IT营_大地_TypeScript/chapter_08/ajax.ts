
//*

// 需要实现的代码示例
// $.ajax({
//   type: "GET",
//   url: "test.json",
//   data: { username: $("#username").val(), content: $("#content").val() },
//   dataType: "json"
// });

//*/

// 在浏览器跑编译好的代码

interface Config {
  type: string;
  url: string;
  data?: string;
  dataType: string;
}

function ajax(config: Config) { // 原生js封装的ajax 

  var xhr = new XMLHttpRequest();

  xhr.open(config.type, config.url, true);

  xhr.send(config.data);

  xhr.onreadystatechange = function () {

    if (xhr.readyState == 4 && xhr.status == 200) {

      console.log('成功');

      if (config.dataType == 'json') {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log(xhr.responseText)
      }

    }
  }
}


ajax({
  type: 'get',
  data: 'name=zhangsan',
  url: 'http://a.itying.com/api/productlist', //api
  dataType: 'json'
})


