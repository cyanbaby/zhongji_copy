# 测试lodash
```shell
# 创建link包
cd source
cd node_modules/lodash
npm link

# project 安装低版本 lodash 后， npm link lodash 高版本
cd project
npm i lodash@0.1.0 -D
npm link lodash       # 不会重写 package.json 中的lodash版本

# 项目中卸载 link 包
cd project
npm unlink lodash  # 会删除 node_modules/lodash 删除软链后，不会保留之前丢失的lodash目录

# 全局卸载
cd source
cd node_modules/lodash
npm unlink
```

