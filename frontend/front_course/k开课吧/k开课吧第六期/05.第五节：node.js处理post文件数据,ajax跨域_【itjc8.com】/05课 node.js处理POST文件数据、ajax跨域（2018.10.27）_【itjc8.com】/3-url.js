const url=require('url');

let str='http://www.bing.com:8080/a/b/1.html?a=1&a=2&a=3';

console.log(url.parse(str, true));
