const http=require('http');
const mysql=require('mysql');

//1.连接到服务器
let db=mysql.createConnection({host: 'localhost', user: 'root', password: '', database: '20181101'});

/*db.query('SELECT * FROM user_table', (err, data)=>{
  if(err){
    console.log('错了', err);
  }else{
    console.log(data);
  }
});*/

let username='blue';
let password='6666666';
db.query(`INSERT INTO user_table (username, password) VALUES('${username}', '${password}')`, (err, data)=>{
  if(err){
    console.log('错了', err);
  }else{
    console.log(data);
  }
});
