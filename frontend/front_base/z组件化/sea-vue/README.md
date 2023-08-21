# sea-vue
seajs
seajs-css
seajs-text


## 导入/导出
```js


// xxx.js

// xxx组件 如果用了pagination组件
var pagination = require('./pagination/pagination.js')

// xxx组件
defined(function(require, exports, module) {
  var html = require('./xxx.html')
  require('./xxx.css')

  return {
    props: ['xxx'],
    data() {
      return {
        navs: [],
        name: '张三',
        age: 18
      }
    },
    components: {
      'pagination': pagination
    }
  }
})

// pagination.js

```


## 启动页
```html
<div id="app">
  <dcn-topbar :navs="navs" :w3-id="w3Id">
</div>

<script src="../public/frameworks/seajs/sea-3.0.0.js"></script>
<script src="../public/page-init-vue.js"></script>

<script>
  pageInit(function() {
    new Vue({
      el: '#app',
      data: {
        navs: [
          { name: 'DCN', url: 'http://www.baidu.com' },
          { name: '服务', hasSunmenu: true },
          { name: '收藏', hasSunmenu: true },
        ],
        w3Id: 'zwx876495'
      },
      components: {
        'dcn-topbar': topbarCmp
      }
    })
  })
</script>
```