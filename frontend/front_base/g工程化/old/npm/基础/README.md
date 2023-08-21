# npm 常用相关
[npm配置简书](https://www.jianshu.com/p/a0c06eafb9fd)
[npm 常用命令](https://juejin.cn/post/6844903775233114125)
[npm 常用命令](https://www.jianshu.com/p/087d839e1d0c)
[npm 查询全局包](https://blog.csdn.net/github_38305441/article/details/107518979)
[npm 前世今生](https://juejin.cn/post/6865635467249844232)

todo npm的package.json相关概念，潜规则，脚本，npx,cache,link等等。
todo pnpm

## npm 常用命令

### 查看是否安装过某个包
```shell
# 全局查看
npm ls typescript -g

# 局部查看
npm ls typescript
```

### 包自身的cli命令
```shell
# 每个包有没有命令行工具都不一定，如果有得去看对应文档，例如typescript
tsc -v
# 
```
### 卸载包
```shell
# 卸载局部模块
npm uninstall package-name

# 卸载全局模块
npm uninstall -g package-name
```


