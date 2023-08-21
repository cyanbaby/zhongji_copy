const http=require('http');
const util=require('buffer_util');
const fs=require('fs');

http.createServer((req, res)=>{
  let boundary='--'+req.headers['content-type'].split('; ')[1].split('=')[1];

  let arr=[];
  req.on('data', buffer=>{
    arr.push(buffer);
  });
  req.on('end', ()=>{
    let buffer=Buffer.concat(arr);

    //1.按照分隔符切分
    let res=util.bufferSplit(buffer, boundary);

    res.pop();
    res.shift();

    //2.每一个处理一下
    res.forEach(buffer=>{
      buffer=buffer.slice(2, buffer.length-2);

      let n=buffer.indexOf('\r\n\r\n');

      let info=buffer.slice(0, n).toString();
      let data=buffer.slice(n+4);

      if(info.indexOf('\r\n')!=-1){
        //文件
        let res2=info.split('\r\n')[0].split('; ');
        let name=res2[1].split('=')[1];
        let filename=res2[2].split('=')[1];

        name=name.substring(1, name.length-1);
        filename=filename.substring(1, filename.length-1);

        fs.writeFile(`upload/${filename}`, data, err=>{
          if(err){
            console.log(err);
          }else{
            console.log('上传成功');
          }
        });
      }else{
        //普通信息
        let name=info.split('; ')[1].split('=')[1];
        name=name.substring(1, name.length-1);

        //console.log(name);
      }

      //console.log(data.toString());
    });
  });
}).listen(8080);
