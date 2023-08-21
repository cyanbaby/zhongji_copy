# 第二节：配置文件

VuePress 使用 `config.js` 文件进行配置。这个文件位于 `.vuepress` 目录下，包含以下内容：

```javascript
module.exports = {
  title: '我的语雀项目',
  description: '这是一个使用 VuePress 搭建的类似语雀的项目',
  themeConfig: {
    // ...
  },
};
