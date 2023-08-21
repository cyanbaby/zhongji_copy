const http=require('http');

let allowOrigin={
  'http://localhost': true,
  'http://aaa.com': true,
  'https://aaa.com': true,
}

http.createServer((req, res)=>{
  let {origin}=req.headers;

  if(allowOrigin[origin]){
    res.setHeader('access-control-allow-origin', '*');
  }

  res.write('{"a": 12, "b": "Blue"}');
  res.end();
}).listen(8080);
