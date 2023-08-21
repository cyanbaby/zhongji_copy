const querystring=require('querystring');

//console.log(querystring.parse("a=12&b=5&c=99"));
console.log(querystring.stringify({a: 12, b: 99, c: 'blue'}));
