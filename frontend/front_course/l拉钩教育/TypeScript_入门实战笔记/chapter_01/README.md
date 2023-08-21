# 01 | 如何快速搭建 TypeScript 学习开发环境？

应用目录 settings.json  配置 VS Code 默认使用应用目录下安装的 TypeScript 版本
必须项目根目录打开vscode 才是所谓的工作区，方可切换 TypeScript 版本
```js
{
  "typescript.tsdk": "node_modules/typescript/lib"
}
```


在项目中安装typescript
```shell
pnpm i typescript@3.9.2

npx tsv -v
```

[Playground - TypeScript 云环境](https://www.typescriptlang.org/zh/play?target=1&module=1&ts=3.9.7#code/Q)


本课程中涉及的所有示例都是基于如下所示的统一配置编写
```js
{
  "compilerOptions": {
    /* 严格的类型检查选项 */
    "strict": true,                         // 启用所有严格的类型检查选项
    "noImplicitAny": true,                  // 对隐含的“any”类型的表达式和声明引发错误
    "strictNullChecks": true,               // 启用严格的空检查
    "strictFunctionTypes": true,            // 启用严格的函数类型检查
    "strictBindCallApply": true,            // 在函数上启用严格的'bind'， 'call'和'apply'方法
    "strictPropertyInitialization": true,   // 在类中启用严格的属性初始化检查。
    "noImplicitThis": true,                 // 当'this'表达式包含隐含的'any'类型时引发错误
    "alwaysStrict": false,                  // 以严格模式解析，并对每个源文件发出“use strict”
  }
}

```


tsc 将忽略当前应用路径下的 tsconfig.json 配置，因此我们需要通过显式设定如下所示的参数，让 tsc 以严格模式检测并转译 TypeScript 代码
```shell
tsc HelloWorld.ts --strict --alwaysStrict false
# 监听
tsc HelloWorld.ts --strict --alwaysStrict false --watch
```

[使用ts-node直接运行ts脚本](https://cloud.tencent.com/developer/article/1805310?from=15425)
```shell
pnpm i ts-node --save-dev

npx ts-node HelloWorld.ts
# 或
npx ts-node
```