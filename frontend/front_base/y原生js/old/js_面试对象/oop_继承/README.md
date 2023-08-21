









# Event 相关
* todo [Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)
* todo DOM的继承 bilibli老外的课程
* todo 主动触发onmouseover事件
* todo Event Loop
* todo remove 元素 click事件 所有处理程序
* todo 事件冒泡/捕获/代理
* todo [chrome 命令行 api - window.getEventListeners(obj)](https://segmentfault.com/q/1010000003105895)
* todo [杂文，删除所有事件监听器](https://zditect.com/article/10772086.html)  
```js
// chrome 控制台
// 在 https://www.qiyuandi.com/zhanzhang/zonghe/13218.html 浏览器控制台执行
var allNodes = [];
function getChildNode(node) {
  //先找到子结点
  var nodeList = node.childNodes;
  for (var i = 0; i < nodeList.length; i++) {
    //childNode获取到到的节点包含了各种类型的节点
    //但是我们只需要元素节点  通过nodeType去判断当前的这个节点是不是元素节点
    var childNode = nodeList[i];
    //判断是否是元素结点
    if (childNode.nodeType == 1) {
      // childNode.style.border = "1px solid pink";
      console.log(window.getEventListeners(childNode).mousedown)
      if(window.getEventListeners(childNode) && (window.getEventListeners(childNode).mousedown || window.getEventListeners(childNode).mouseup)) {
        
        allNodes.push(childNode)
      }
      getChildNode(childNode);
    }
  }
}
getChildNode(document.body);
// 全是undefined，再检查一下window就ok了

window.getEventListeners(window)
window.removeEventListener('mousedown', window.getEventListeners(window).mousedown[0].listener)
window.removeEventListener('mouseup', window.getEventListeners(window).mouseup[0].listener)
window.getEventListeners(window)
```
* todo DOM树 & 遍历网页所有节点包括window和document
* todo children 和 childNodes 区别
* todo canvas和其他h5c3新特性