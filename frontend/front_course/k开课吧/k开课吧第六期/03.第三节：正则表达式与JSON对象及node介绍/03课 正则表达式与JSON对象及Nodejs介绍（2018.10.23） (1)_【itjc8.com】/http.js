const http=require('http');

let server=http.createServer(()=>{   //请求
  console.log('请求来了');
});
//监听
server.listen(8080);
