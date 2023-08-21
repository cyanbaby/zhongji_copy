# yarn  常用相关
[yarn 命令列表](https://juejin.cn/post/6844904031001788430)
[yarn 常用命令](https://www.jianshu.com/p/f5d85e541a99)
[yarn 常用命令](https://juejin.cn/post/6850418119317504007)
[yarn 常用命令详解](https://www.pengzhenjin.top/archives/yarn常用命令详解#DwdHdTjf)
[npm/yarn 查询全局包](https://learnku.com/articles/16798/quick-view-of-npm-and-yarn-global-installed-packages)
[npm/yarn 全局依赖安装路径的查询和修改](https://cloud.tencent.com/developer/article/1874279)
[使用 yarn global 代替 npm -g](https://segmentfault.com/a/1190000008489881)

## yarn 常用命令

### 查看是否安装过某个包
```shell
# 全局查看
yarn global list

# 局部查看 用npm就也能能查看yarn安装的lodash版本
# npm ls lodash
yarn list
```

### 安装包
```shell
# 局部添加依赖
yarn add lodash

# 全局添加依赖
yarn global add lodash
```

### 卸载包
```shell
# 卸载局部模块
yarn remove lodash

# 卸载全局模块
npm uninstall -g package-name
```

## 其他问题
后续迁入issue
[yarn 版本问题](https://www.cxyzjd.com/article/a951055/104322134)