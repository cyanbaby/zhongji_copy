## [Node.js模块系统](https://www.runoob.com/nodejs/nodejs-module-system.html)

### demo01 - 第1种导入导出
```js
var hello = require('./hello');
hello.world();

exports.world = function() {
  console.log('Hello World');
}
// hello.js 通过 exports 对象把 world 作为模块的访问接口，在 main.js 中通过 require('./hello') 加载这个模块，然后就可以直接访 问 hello.js 中 exports 对象的成员函数了。
```

### demo02 - 第2种导入导出
```js
// main.js 
var Hello = require('./hello'); 
hello = new Hello(); 
hello.setName('BYVoid'); 
hello.sayHello(); 

//hello.js 
function Hello() { 
    var name; 
    this.setName = function(thyName) { 
        name = thyName; 
    }; 
    this.sayHello = function() { 
        console.log('Hello ' + name); 
    }; 
}; 
module.exports = Hello;
// 有时候我们只是想把一个对象封装到模块中  函数和{} 都是对象
```

## 

## TODO
*  require 方法极其简单，但是内部的加载却是十分复杂的，其加载优先级也各自不同
*  Node.js组成
*  菜鸟教程node.js其他相关知识，多线程等等