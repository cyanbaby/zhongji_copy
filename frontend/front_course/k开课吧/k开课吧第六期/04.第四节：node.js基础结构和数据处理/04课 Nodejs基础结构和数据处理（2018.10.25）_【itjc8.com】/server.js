const http=require('http');

let server=http.createServer(function (req, res){
  res.write('abc');
  res.end();
});
server.listen(8080);
