const express=require('express');
const cookieParser=require('cookie-parser');

let server=express();
server.listen(8080);

server.use(cookieParser(
  'fasdgfhsrtyredfbfd56te5645sdter76tytutyi456ythgfgerrhdfghfdg'
));

server.get('/a', (req, res)=>{
  console.log('cookie:', req.cookies);         //未签名的
  console.log('signed:', req.signedCookies);   //签名的

  //
  res.cookie('amount', 99.8, {
    //httpOnly: true,
    maxAge: 14*86400*1000,
    //secure: true,         //只有https
    signed: true
  });


  res.send('ok');
});
