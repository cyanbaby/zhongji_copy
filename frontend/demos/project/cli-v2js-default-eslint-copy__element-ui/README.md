# cli-v2js-default-eslint-copy-element-ui
copy cli-v2js-default-eslint

## 移动 复用 node_modules
移动 cli-v2js-default-eslint 中的 node_modules

```js
zhangg@DESKTOP-IHPUCAV MINGW64 ~/demos/project
$ ls
cli-v2js-default-eslint  cli-v2js-default-eslint-copy__element-ui

zhangg@DESKTOP-IHPUCAV MINGW64 ~/demos/project
$ mv cli-v2js-default-eslint/node_modules/ cli-v2js-default-eslint-copy__element-ui/
```

## 安装 使用 element-ui
* 逗号，分号提示可能没有或者没配置
* 定义未使用的变量还是飘红的，终端也会提示
* 使用 Prettier 和 Vetur 格式化代码都会在末尾加逗号和分号，说明我可能没有配置 eslint 呀

## 尝试关闭 Prettier 格式化 末尾加逗号和分号
* [package.json 亲测可用](https://blog.csdn.net/qq_44180688/article/details/119823767)
  * Prettier配置的方式和权重
  * .prettierrc.js 的方式亲测可用
