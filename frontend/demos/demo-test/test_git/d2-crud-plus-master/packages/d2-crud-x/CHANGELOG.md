# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.17.9](https://github.com/greper/d2-crud-plus/compare/v2.17.8...v2.17.9) (2021-10-26)

**Note:** Version bump only for package d2-crud-x





## [2.17.7](https://github.com/greper/d2-crud-plus/compare/v2.17.6...v2.17.7) (2021-09-13)


### Bug Fixes

* 修复只有一个文本输入框时，按回车键刷新页面的bug ([3e06349](https://github.com/greper/d2-crud-plus/commit/3e06349002d3a09037f904337f7bf21b52350983))





## [2.17.6](https://github.com/greper/d2-crud-plus/compare/v2.17.5...v2.17.6) (2021-07-23)


### Performance Improvements

* 支持自定义行编辑添加行方式,增加行编辑事件 ([e0c6873](https://github.com/greper/d2-crud-plus/commit/e0c6873c3d0eb5bd91a1bbaa8b1fd7e2991d0533))





## [2.17.5](https://github.com/greper/d2-crud-plus/compare/v2.17.3...v2.17.5) (2021-07-19)


### Bug Fixes

* 重新发布版本，修复example启动报webpack loader的问题 ([c9a3c96](https://github.com/greper/d2-crud-plus/commit/c9a3c96eeed7c2f377066a931d1d772ff9c1c88a))





## [2.16.9](https://github.com/greper/d2-crud-plus/compare/v2.16.8...v2.16.9) (2021-06-18)


### Performance Improvements

* loading转移到table上 ([238922a](https://github.com/greper/d2-crud-plus/commit/238922ae48670a5d8b38f3762534603ca46b776e))





## [2.16.8](https://github.com/greper/d2-crud-plus/compare/v2.16.7...v2.16.8) (2021-06-16)


### Bug Fixes

* 修复在添加状态下，点击刷新会丢失一条数据的bug ([ff7a065](https://github.com/greper/d2-crud-plus/commit/ff7a065c6b5aae07044c04ef894e8bd84e53ed3f))
* wangeditor 不能多个的问题 ([81a5211](https://github.com/greper/d2-crud-plus/commit/81a52114d971843e493a1afc1cb1c9f308614041))





## [2.16.6](https://github.com/greper/d2-crud-plus/compare/v2.16.3...v2.16.6) (2021-06-09)


### Bug Fixes

* 可配置不同的key ([dd158f4](https://github.com/greper/d2-crud-plus/commit/dd158f436809d84f0666a4e54420c2761bc3e10e))





## [2.16.3](https://github.com/greper/d2-crud-plus/compare/v2.16.2...v2.16.3) (2021-04-28)


### Bug Fixes

* 点击放弃保存，不执行dialogClosed的bug ([c28bb91](https://github.com/greper/d2-crud-plus/commit/c28bb91d58570ce08c8ca8d10ed2a12f1b098bf6))
* 多级列，动态更新，丢失部分列显示的bug ([bfdfb26](https://github.com/greper/d2-crud-plus/commit/bfdfb26b4336053a6f069e8c351080f774fac613))





## [2.16.2](https://github.com/greper/d2-crud-plus/compare/v2.16.1...v2.16.2) (2021-03-11)


### Bug Fixes

* 修复懒加载的bug ([13f5e86](https://github.com/greper/d2-crud-plus/commit/13f5e863cebf24f9212d5800b08d3809456a83ab))





# [2.16.0](https://github.com/greper/d2-crud-plus/compare/v2.15.1...v2.16.0) (2021-02-11)


### Bug Fixes

* 修复max-height下无法全屏的bug ([5d8d529](https://github.com/greper/d2-crud-plus/commit/5d8d5299b319f037f9a6a136e9082799ffa023a1))


### Performance Improvements

* handle custom 按钮支持本身参数 ([7639baa](https://github.com/greper/d2-crud-plus/commit/7639baa8436f8b048f892a2450673978b50de7cb))





# [2.15.0](https://github.com/greper/d2-crud-plus/compare/v2.14.0...v2.15.0) (2021-01-11)


### Bug Fixes

* [#124](https://github.com/greper/d2-crud-plus/issues/124) fetchDetail会经过valueBuilder处理 ([f995c10](https://github.com/greper/d2-crud-plus/commit/f995c10e432d28f36d928513a47a1a2878dc5d4a))
* [#135](https://github.com/greper/d2-crud-plus/issues/135) 关闭查看模式下的修改检测提示 ([304311d](https://github.com/greper/d2-crud-plus/commit/304311d904fd3351e31e658ba4b237aad4a25861))


### Features

* 自定义表单对话框 ([09cb596](https://github.com/greper/d2-crud-plus/commit/09cb59675aa2b034b09f367498226fbf1d6c9451))
* showDialog 支持自定义mode，同时增加modeContext参数，支持mode=edit的同时可以有不同的处理 ([168face](https://github.com/greper/d2-crud-plus/commit/168facecae56b4c943777010763ce6c93480e69a))





# [2.14.0](https://github.com/greper/d2-crud-plus/compare/v2.13.6...v2.14.0) (2020-12-22)


### Features

* 操作列按钮折叠 ([661c55d](https://github.com/greper/d2-crud-plus/commit/661c55d82989fbe37dc9683864e174bcde0e53d3))


### Performance Improvements

* 树形组件优化，增加过滤，对话框内部滚动条，增加对话框关闭事件 ([87eda0f](https://github.com/greper/d2-crud-plus/commit/87eda0fe0ece60876920f2b436cbe74cab58b022))
* 优化操作列按钮折叠 ([5f8fb03](https://github.com/greper/d2-crud-plus/commit/5f8fb03e67a7c64801411607a44299115747c45e))





## [2.13.6](https://github.com/greper/d2-crud-plus/compare/v2.13.5...v2.13.6) (2020-12-14)


### Bug Fixes

* 抽屉模式禁用拖拽和全屏，取消抽屉模式下的focus效果 ([bd3db8f](https://github.com/greper/d2-crud-plus/commit/bd3db8fc320c8b3150543632ae51162a47f30a21))
* 修复行slot获取不到index的bug ([880c0aa](https://github.com/greper/d2-crud-plus/commit/880c0aaa035b5a87ac4ef44f248cc37786272fce))


### Performance Improvements

* 对话框表单支持最大高度，滚动条在对话框内部 ([0b2e2dd](https://github.com/greper/d2-crud-plus/commit/0b2e2dd500d2292945411a8029d27355999ffe0c))





## [2.13.4](https://github.com/greper/d2-crud-plus/compare/v2.13.3...v2.13.4) (2020-11-30)


### Bug Fixes

* dialog-opened 支持返回row全量数据 ([fcfb4ea](https://github.com/greper/d2-crud-plus/commit/fcfb4ea577642572063395dbeb9ba8254cab280d))
* fetchDetail 增加formMode ([1996a1b](https://github.com/greper/d2-crud-plus/commit/1996a1b6ed0ad54a18d0134d725c08b18a644453))
* fetchDetail文档完善 ([046ecf0](https://github.com/greper/d2-crud-plus/commit/046ecf04ce5fae77dfe65c328be70ea75776d080))
* 修复抽屉表单没有滚动条的bug ([7a6a951](https://github.com/greper/d2-crud-plus/commit/7a6a95144a701aada67c5fc0948591d32d3dd9aa))
* 修复行操作按钮的事件冒泡问题，https://github.com/greper/d2-crud-plus/issues/93 ([fa76408](https://github.com/greper/d2-crud-plus/commit/fa7640873b1a0670d7d851d66c0b0b37ff195f36))
* 取消抽屉模式焦点关闭按钮边框 ([b8c8b3e](https://github.com/greper/d2-crud-plus/commit/b8c8b3e637f3be3097ec3c328c1753cce3b07bcf))





## [2.13.3](https://github.com/greper/d2-crud-plus/compare/v2.13.2...v2.13.3) (2020-11-15)


### Bug Fixes

* 修复抽屉表单全屏按钮问题，设置fullscreen=null即可 ([6cef8fd](https://github.com/greper/d2-crud-plus/commit/6cef8fd1a426cba7e5293ff1d74dbb84db81cc64))
* slot增加index ([9a15d04](https://github.com/greper/d2-crud-plus/commit/9a15d048d7e7be3e743bcbcf417be9c599b4bd2c))


### Performance Improvements

* 去除多余的log ([8f789c1](https://github.com/greper/d2-crud-plus/commit/8f789c15f680e994d0397b2eb387e23eded510de))
* 优化crud-x的包大小 ([aa41b3b](https://github.com/greper/d2-crud-plus/commit/aa41b3bd10e0547c943eaad26c915d0c58ee9854))





## [2.13.2](https://github.com/greper/d2-crud-plus/compare/v2.13.1...v2.13.2) (2020-11-04)


### Bug Fixes

* 打开第二次对话框触发formDataChange的bug ([d08f824](https://github.com/greper/d2-crud-plus/commit/d08f8249d6a4bfaba7b1b4855262c75c3bb9d848))
* 前端分页没有更新的问题 ([bdced0c](https://github.com/greper/d2-crud-plus/commit/bdced0c8c47e270bc3733af5b61da20c422141dd))
* 修复tree-selector 打开对话框就触发change的bug ([f0ab6e7](https://github.com/greper/d2-crud-plus/commit/f0ab6e7308126522f14077b0256c14cf32d305a4))


### Performance Improvements

* render增加scope ([a2674b1](https://github.com/greper/d2-crud-plus/commit/a2674b1c53c86af96444273366d17428b734ddfc))
* render增加scope ([c9664b0](https://github.com/greper/d2-crud-plus/commit/c9664b040c54f42b02fe8021611f0749966d6618))





## [2.13.1](https://github.com/greper/d2-crud-plus/compare/v2.13.0...v2.13.1) (2020-11-02)


### Bug Fixes

* formOptions.type增加默认值 ([8156d49](https://github.com/greper/d2-crud-plus/commit/8156d49a7ed221d15bd8a4349f24fea1f12c0a23))
* 恢复误删的provider ([3ce7ce9](https://github.com/greper/d2-crud-plus/commit/3ce7ce99e61867e37b4b4377df2071e81f288847))





# [2.13.0](https://github.com/greper/d2-crud-plus/compare/v2.12.3...v2.13.0) (2020-11-01)


### Features

* 表单增加抽屉模式，优化表单打开动画，检测修改提醒保存 ([dde6933](https://github.com/greper/d2-crud-plus/commit/dde6933d603ee1c376f96a82a1a4d552d5bddb66))
* 行编辑增加表单校验 ([8d22629](https://github.com/greper/d2-crud-plus/commit/8d226294b31506aae39f4d85483946b4e9043c01))
* 行编辑支持 ([2ecefb9](https://github.com/greper/d2-crud-plus/commit/2ecefb9e27320babb2bd34bf6bf0b832ba5ebc43))





## [2.12.1](https://github.com/greper/d2-crud/compare/v2.12.0...v2.12.1) (2020-10-31)


### Bug Fixes

* 修复非配置字段赋值的bug ([ddbd2e0](https://github.com/greper/d2-crud/commit/ddbd2e0f0a773abaa2108562e8174b7da57dbfbb))
* 修复非配置字段赋值的bug ([9a3daaa](https://github.com/greper/d2-crud/commit/9a3daaa2ba8bee34b4d82587a18127cd874591b3))


### Performance Improvements

* 增加el-table的 events配置 ([d5dce3b](https://github.com/greper/d2-crud/commit/d5dce3bd0d65225041acb2560422a2b6b615c0a8))





# [2.12.0](https://github.com/greper/d2-crud/compare/v1.1.0...v2.12.0) (2020-10-21)


### Bug Fixes

* d2-crud的一些兼容性工作 ([5583eed](https://github.com/greper/d2-crud/commit/5583eed908acb715406b9b4b9a40b8fa7619fc9e))
* exapndRow=true 报错的bug ([7d1740a](https://github.com/greper/d2-crud/commit/7d1740a301ef4187eba31e446640fcd25a5307f6))
* paginationPrefix还是不能改成flex ([9379761](https://github.com/greper/d2-crud/commit/9379761bfb27ae3f213a310be25f04becf1b347b))
* 修复cell-data-change事件 ([304a242](https://github.com/greper/d2-crud/commit/304a24271e6c8085c77655c4aea7e5ed66040051))
* 修复d2Crud与d2CrudX样式冲突的问题 ([b6593ac](https://github.com/greper/d2-crud/commit/b6593ac6f88d65e706f90530438fbe6abe536ec8))
* 修复d2Crud与d2CrudX样式冲突的问题 ([781649e](https://github.com/greper/d2-crud/commit/781649e818607033b61e2fcf522b2311ad6737db))
* 修复d2Crud与d2CrudX样式冲突的问题 ([435c17c](https://github.com/greper/d2-crud/commit/435c17c12b1c343f0ec92e05263e5d2d1531ea3e))
* 修复expand不显示的bug ([072928e](https://github.com/greper/d2-crud/commit/072928e06154c35c6860969dddf0391c8bd50fcd))
* 修复expand不显示的bug ([ba26c48](https://github.com/greper/d2-crud/commit/ba26c483ea5290ddeb31b27b235693b853cd9fd9))
* 修复fetchDetail在添加时异常问题 ([18899a4](https://github.com/greper/d2-crud/commit/18899a4760420e0d254f261938cda9c21adc6d99))
* 修复rowHandle=false时报警告的问题 ([31730c2](https://github.com/greper/d2-crud/commit/31730c2bb4f163b0d7702b7c695e97a480b8ae0e))
* 修复slot方式修改数组数据会把行数据也改掉的bug ([bd8f14f](https://github.com/greper/d2-crud/commit/bd8f14f8d069d1335629cc3a044379102ad69bb8))
* 修复vxe-table的一些bug ([0a8a52f](https://github.com/greper/d2-crud/commit/0a8a52fd6d40e47f41502fbe050f8348e30e3377))
* 修复vxe-table获取不到row index的bug ([08650a8](https://github.com/greper/d2-crud/commit/08650a89e5020fb6f2aed7efe04bb7a0cf3bb902))
* 修复一个奇怪的问题 ([709ff8f](https://github.com/greper/d2-crud/commit/709ff8f275e92cc55540478ffc5e968d935059b3))
* 修复一个空指针异常 ([0df235e](https://github.com/greper/d2-crud/commit/0df235e837cc7fd3f9e7603c6d735c1aa6336890))
* 修复嵌套表格点击删除按钮刷新页面的bug ([4db54b1](https://github.com/greper/d2-crud/commit/4db54b1eba5dd703545147d1d0affacfebd8b7bf))
* 修复文件上传进度条显示的bug，优化一些其他显示上的问题 ([53d54ba](https://github.com/greper/d2-crud/commit/53d54bad45782ddc7a6970ad25c2811e137ff41b))
* 修复空指针异常 ([35e1b7b](https://github.com/greper/d2-crud/commit/35e1b7b71c32fe6c8e5cf3447d366ad7b4a9306b))
* 修复自定义按钮获取不到行数据的bug ([ca5a82e](https://github.com/greper/d2-crud/commit/ca5a82e2e79d14e13e45e8adafbdeed80a6533c5))
* 修复获取不到分组中的字段配置的问题 ([2a29a25](https://github.com/greper/d2-crud/commit/2a29a25111252e2a406da6ae97220cb65bea66f5))
* 减少vxetable的警告 ([6f2a0cb](https://github.com/greper/d2-crud/commit/6f2a0cb842a3c65e9b4ba1e0198cec9489fe595f))
* 减少vxetable的警告 ([8e30fb7](https://github.com/greper/d2-crud/commit/8e30fb78d2596f402fbdea6e35a4956a58e82b76))
* 删除无用的$d2CrudSize配置 ([8de9ef8](https://github.com/greper/d2-crud/commit/8de9ef83c3997442faacf0dcf9327be10357454e))
* 取消横向拉伸功能，解决对话框文本无法选择的bug ([44ec7d7](https://github.com/greper/d2-crud/commit/44ec7d71400bd405b6111390a82025d9d7f850fc))
* 增加选项的禁用配置，增加dictSwitch,部分ie兼容性问题修复 ([c91a04b](https://github.com/greper/d2-crud/commit/c91a04bbdd201d117953048c56cca53ae66dad0d))
* 增加配置项updateTableDataAfterEdit，保存对话框后不插入数据到table中，通过刷新列表更新数据 ([6ee6f07](https://github.com/greper/d2-crud/commit/6ee6f079f202a0ff053d318c251139d2aa1f0312))
* 支持自定义d2-crud的标签名称 ([2e61b53](https://github.com/greper/d2-crud/commit/2e61b53d746cda80fc7ed1d63db5c1921b599bb2))


### Features

* d2-crud多级表头重构,抽取d2-cell组件 ([0a11bf5](https://github.com/greper/d2-crud/commit/0a11bf5d5116bdb74cf33129e04efac0d53bb154))
* dict配置增加覆盖全局getRemoteDataFunc的方法，全局方法增加dict参数 ([22db385](https://github.com/greper/d2-crud/commit/22db38591d7c285b0e50ce8b9cd6aedd0c5032f9))
* 发布 ([37af76c](https://github.com/greper/d2-crud/commit/37af76c91d205e772118aee50f87766b25804274))
* 取消单独的el-input，合并到renderCustomComponent ([a7b30cb](https://github.com/greper/d2-crud/commit/a7b30cbc3dde40de04715a51914e92ad769569cc))
* 实验性支持vxe-table ([9b518c4](https://github.com/greper/d2-crud/commit/9b518c46091a76a3bfc96d9c79ee763a26be9fa2))
* 对话框全屏，标题slot ([2bd3dec](https://github.com/greper/d2-crud/commit/2bd3decf4816502c7413afa6106e3cb746846eb4))
* 对话框增加自定义header slot ([0c25a93](https://github.com/greper/d2-crud/commit/0c25a93e85f91b34c2cc2e6f5883e1ab284cbb0c))
* 操作列按钮排序 ([ee5c3b4](https://github.com/greper/d2-crud/commit/ee5c3b459b72304bde40b6c80ee4d346eae90be6))
* 支持d2-column递归组件 ([b536e21](https://github.com/greper/d2-crud/commit/b536e21a94e399ac403a24e8d5910000510c42a5))
* 支持点号key的方式配置多级数据 ([927600d](https://github.com/greper/d2-crud/commit/927600d0fefb4c281c2b797f29158ac792cca99c))
* 新增工具条功能：刷新，查询展开，页面紧凑切换，列设置。内置分页组件可以启用 ([980ff30](https://github.com/greper/d2-crud/commit/980ff30154453c8b1cd77f19f9efe6f7a20f9bef))
* 更简单方便易用的组件禁用方式（disabled） ([b194ac1](https://github.com/greper/d2-crud/commit/b194ac1f62d88ffd7d887cb8a56e55a4b5cf2511))
* 查看功能 ([7d03e94](https://github.com/greper/d2-crud/commit/7d03e94dc2ea6b67211ac554fe2f0ef3d8912a49))
* 自定义事件监听支持 ([1f9fd39](https://github.com/greper/d2-crud/commit/1f9fd39316375c6102279e1a7a65b33ae16a4733))
* 表单支持分组 ([96f1b54](https://github.com/greper/d2-crud/commit/96f1b54ff480b95461ac37556eeef66fd925a158))
* 重大优化 ([9b1009a](https://github.com/greper/d2-crud/commit/9b1009a62383db653ac25f7f83b048dad0a40448))


### Performance Improvements

* column.show支持传入一个无参方法，form表单支持自定义排序 ([0500c40](https://github.com/greper/d2-crud/commit/0500c40f6bc717d6ad3a0e680fe7e670b47494ea))
* crud-x 打开编辑对话框后发送 dialog-opened事件 ([2d6a4c2](https://github.com/greper/d2-crud/commit/2d6a4c2d1956305b10fe6eac16f9644c4fe31549))
* crud-x 打开编辑对话框后发送 dialog-opened事件 ([eeb12df](https://github.com/greper/d2-crud/commit/eeb12df19a3aa1c031c6196fb4c41cdc65d2ac16))
* d2-form-item抽取重构 ([aaf3564](https://github.com/greper/d2-crud/commit/aaf35642dcb5ce568a8b8e6fc2bac378bda112de))
* el-form-item增加配置，form.itemProps ([a602cce](https://github.com/greper/d2-crud/commit/a602cce96df65fc7decdbd98e2782e65cd66a9b0))
* extends解除d2crudplus依赖 ([66c5c70](https://github.com/greper/d2-crud/commit/66c5c70bbf505e76296257c56debef0d5855b843))
* form传递方式改为provide/inject方式 ([158a225](https://github.com/greper/d2-crud/commit/158a225be45aabd5a29de812ea1f00320212a26f))
* helper增加render方式 ([56a2c14](https://github.com/greper/d2-crud/commit/56a2c14f69ab600f8c1ad310e7e6dc4d96ea2618))
* jsx示例 ([137f745](https://github.com/greper/d2-crud/commit/137f7458bdc37b36b18b9f60df67011fb4c9ab60))
* rowhandle btn 图标支持传入一个方法 ([90bca1c](https://github.com/greper/d2-crud/commit/90bca1c64f8f9c3f6128f5adcf4ed21e0edf4beb))
* rowHandle增加rowHandle插槽 ([8ad84e9](https://github.com/greper/d2-crud/commit/8ad84e9fc9991a5baa446848d7d8d90e1f3534b6))
* show disabled readonly 支持context参数 ([44e4502](https://github.com/greper/d2-crud/commit/44e4502b76011227a0c511f99d8cb1ca479cc803))
* showDialog支持view模式 ([5d79f76](https://github.com/greper/d2-crud/commit/5d79f765357ba77d341d64ccba8e80ea0dbbc0f6))
* slot增加scope.mode ([fdc088f](https://github.com/greper/d2-crud/commit/fdc088fcd44f3a8e3e596aec9471feff7da25a3f))
* slot增加scope.mode ([cb83bae](https://github.com/greper/d2-crud/commit/cb83baee9b6621951fb607dae0186a86836ec2da))
* 优化列表展示性能 ([96dd2bf](https://github.com/greper/d2-crud/commit/96dd2bff511a704fc29f12d4ed342566396014bf))
* 优化列过滤器 ([3775371](https://github.com/greper/d2-crud/commit/37753713a135d4f019717f14f016c1a12c5990a0))
* 优化对话框拖拽体验 ([fc8132b](https://github.com/greper/d2-crud/commit/fc8132bee2bb43e700d16a69a0074802884dad04))
* 优化提交form ([90dab6b](https://github.com/greper/d2-crud/commit/90dab6bf6725ceb4dd22f8a0a664b000c4e9ef66))
* 优化方法名 ([84766ac](https://github.com/greper/d2-crud/commit/84766acd8799f1238689ab707955eafa3b397ab8))
* 动态添加分组示例 ([3bc9ccc](https://github.com/greper/d2-crud/commit/3bc9ccc03d2a75eeec9f9fb0e3623a7a4000025a))
* 升级依赖 ([a4b5635](https://github.com/greper/d2-crud/commit/a4b5635b2ec88b940ac2c1a3eebf2187f875765e))
* 增加footer插槽 ([04db82c](https://github.com/greper/d2-crud/commit/04db82c4e6a9a400e54014e4175fc09b3256d272))
* 增加valueProp参数，可以指定目标组件的某个props接收row[vlaue]的值 ([6409ce2](https://github.com/greper/d2-crud/commit/6409ce2a0ff31f3b5568db9f065a44a2766acac7))
* 增加valueProp配置，可以将row[key]的值复制给valueProp命名的组件属性 ([d30cfbf](https://github.com/greper/d2-crud/commit/d30cfbfeb4e53ea9bfa485fb0fefc2509594a417))
* 增加对话框拖拽功能 ([e928f5b](https://github.com/greper/d2-crud/commit/e928f5b06784cf1cd5411c9a253f52f10b0bcfc9))
* 增加非vModel组件展示的示例 ([2985545](https://github.com/greper/d2-crud/commit/2985545b979798bbc2e629fcb48387246f24ab3d))
* 对话框支持横向拉伸 ([45c4cda](https://github.com/greper/d2-crud/commit/45c4cda9b73626f2f0109fee53308614a9ba3804))
* 对话框确定按钮增加禁用和显示配置 ([eff0736](https://github.com/greper/d2-crud/commit/eff0736a491e6d6bbf4e2ef32e343db82c630674))
* 手动调用addRow方法可以传入默认值 ([59b7a6f](https://github.com/greper/d2-crud/commit/59b7a6f0f33d6cab9fafb3ab7bf02a47007d172c))
* 支持form-item的配置 ([f0fb8dc](https://github.com/greper/d2-crud/commit/f0fb8dcbf82a6c2c91c90ca7b6c7f4972806249f))
* 示例全部改成新版带toolbar界面 ([6770fc9](https://github.com/greper/d2-crud/commit/6770fc9980ba17083ffb414309ad8f6e15d6dbe1))
* 移除d2-icon依赖 ([2d8fdb4](https://github.com/greper/d2-crud/commit/2d8fdb4292f7b26c7f9f8a7dbe9fbab9aca26119))
* 精简renderCustomComponent代码 ([bd544ce](https://github.com/greper/d2-crud/commit/bd544ce9f120712d35ef056e27f1ead6f4a30238))
* 组件独立使用示例 ([5de8d79](https://github.com/greper/d2-crud/commit/5de8d79041046925ebad0f7029f615f68a59deb0))
* 继续完善e2e测试，修复一堆测出来的bug ([fe7446e](https://github.com/greper/d2-crud/commit/fe7446e94468d7a5561213e7bed01bec065210e7))
* 翻页前后增加插槽 ([c132789](https://github.com/greper/d2-crud/commit/c132789bada13e1d47e0423571fbb58d83c9a9bb))
* 自定义操作按钮还是放到后面来 ([ac6847e](https://github.com/greper/d2-crud/commit/ac6847e4065b9af1d7e01f11aa62e8c545ad95ff))
* 行组件disabled方法支持传参 ([1de28b0](https://github.com/greper/d2-crud/commit/1de28b0d9fc426a2483b890ed922890bfcc6179a))
* 行编辑演示 ([aec224f](https://github.com/greper/d2-crud/commit/aec224f87f1a41811d48205280c84c48cb7044a2))
* 表单增加默认值功能 ([41132df](https://github.com/greper/d2-crud/commit/41132dfac320d7ecfed50b00eb8e37b7c6aa3c77))
* 表格滚动条美化 ([0979576](https://github.com/greper/d2-crud/commit/09795765a09e7acf365bdfe23dd5e158267722f7))





## [2.10.5](https://github.com/greper/d2-crud/compare/d2-crud-x@2.10.4...d2-crud-x@2.10.5) (2020-09-27)


### Performance Improvements

* rowhandle btn 图标支持传入一个方法 ([90bca1c](https://github.com/greper/d2-crud/commit/90bca1c64f8f9c3f6128f5adcf4ed21e0edf4beb))
* 移除d2-icon依赖 ([2d8fdb4](https://github.com/greper/d2-crud/commit/2d8fdb4292f7b26c7f9f8a7dbe9fbab9aca26119))





## [2.10.4](https://github.com/greper/d2-crud/compare/d2-crud-x@2.10.3...d2-crud-x@2.10.4) (2020-09-16)

**Note:** Version bump only for package d2-crud-x





## [2.10.3](https://github.com/greper/d2-crud/compare/d2-crud-x@2.10.2...d2-crud-x@2.10.3) (2020-09-09)


### Performance Improvements

* 精简renderCustomComponent代码 ([bd544ce](https://github.com/greper/d2-crud/commit/bd544ce9f120712d35ef056e27f1ead6f4a30238))





## [2.10.2](https://github.com/greper/d2-crud/compare/d2-crud-x@2.10.1...d2-crud-x@2.10.2) (2020-09-03)


### Bug Fixes

* 修复vxe-table获取不到row index的bug ([08650a8](https://github.com/greper/d2-crud/commit/08650a89e5020fb6f2aed7efe04bb7a0cf3bb902))





## [2.10.1](https://github.com/greper/d2-crud/compare/d2-crud-x@2.10.0...d2-crud-x@2.10.1) (2020-09-01)


### Bug Fixes

* d2-crud的一些兼容性工作 ([5583eed](https://github.com/greper/d2-crud/commit/5583eed908acb715406b9b4b9a40b8fa7619fc9e))





# [2.10.0](https://github.com/greper/d2-crud/compare/d2-crud-x@2.9.1...d2-crud-x@2.10.0) (2020-08-25)


### Bug Fixes

* 减少vxetable的警告 ([6f2a0cb](https://github.com/greper/d2-crud/commit/6f2a0cb842a3c65e9b4ba1e0198cec9489fe595f))
* 减少vxetable的警告 ([8e30fb7](https://github.com/greper/d2-crud/commit/8e30fb78d2596f402fbdea6e35a4956a58e82b76))


### Features

* 支持点号key的方式配置多级数据 ([927600d](https://github.com/greper/d2-crud/commit/927600d0fefb4c281c2b797f29158ac792cca99c))





## [2.9.1](https://github.com/greper/d2-crud/compare/d2-crud-x@2.9.0...d2-crud-x@2.9.1) (2020-08-20)


### Bug Fixes

* exapndRow=true 报错的bug ([7d1740a](https://github.com/greper/d2-crud/commit/7d1740a301ef4187eba31e446640fcd25a5307f6))
* 修复一个奇怪的问题 ([709ff8f](https://github.com/greper/d2-crud/commit/709ff8f275e92cc55540478ffc5e968d935059b3))


### Performance Improvements

* rowHandle增加rowHandle插槽 ([8ad84e9](https://github.com/greper/d2-crud/commit/8ad84e9fc9991a5baa446848d7d8d90e1f3534b6))
* 表单增加默认值功能 ([41132df](https://github.com/greper/d2-crud/commit/41132dfac320d7ecfed50b00eb8e37b7c6aa3c77))





# [2.9.0](https://github.com/greper/d2-crud/compare/d2-crud-x@2.8.5...d2-crud-x@2.9.0) (2020-08-14)


### Features

* 取消单独的el-input，合并到renderCustomComponent ([a7b30cb](https://github.com/greper/d2-crud/commit/a7b30cbc3dde40de04715a51914e92ad769569cc))
* 操作列按钮排序 ([ee5c3b4](https://github.com/greper/d2-crud/commit/ee5c3b459b72304bde40b6c80ee4d346eae90be6))


### Performance Improvements

* 增加valueProp参数，可以指定目标组件的某个props接收row[vlaue]的值 ([6409ce2](https://github.com/greper/d2-crud/commit/6409ce2a0ff31f3b5568db9f065a44a2766acac7))
* 增加valueProp配置，可以将row[key]的值复制给valueProp命名的组件属性 ([d30cfbf](https://github.com/greper/d2-crud/commit/d30cfbfeb4e53ea9bfa485fb0fefc2509594a417))
* 增加非vModel组件展示的示例 ([2985545](https://github.com/greper/d2-crud/commit/2985545b979798bbc2e629fcb48387246f24ab3d))





## [2.8.5](https://github.com/greper/d2-crud/compare/d2-crud-x@2.8.4...d2-crud-x@2.8.5) (2020-08-13)


### Performance Improvements

* slot增加scope.mode ([fdc088f](https://github.com/greper/d2-crud/commit/fdc088fcd44f3a8e3e596aec9471feff7da25a3f))
* slot增加scope.mode ([cb83bae](https://github.com/greper/d2-crud/commit/cb83baee9b6621951fb607dae0186a86836ec2da))
* 升级依赖 ([a4b5635](https://github.com/greper/d2-crud/commit/a4b5635b2ec88b940ac2c1a3eebf2187f875765e))
* 继续完善e2e测试，修复一堆测出来的bug ([fe7446e](https://github.com/greper/d2-crud/commit/fe7446e94468d7a5561213e7bed01bec065210e7))






## [2.8.4](https://github.com/greper/d2-crud/compare/d2-crud-x@2.8.3...d2-crud-x@2.8.4) (2020-08-09)

**Note:** Version bump only for package d2-crud-x





## [2.8.3](https://github.com/greper/d2-crud/compare/d2-crud-x@2.8.2...d2-crud-x@2.8.3) (2020-08-06)

**Note:** Version bump only for package d2-crud-x





## [2.8.2](https://github.com/greper/d2-crud/compare/d2-crud-x@2.8.1...d2-crud-x@2.8.2) (2020-08-06)

**Note:** Version bump only for package d2-crud-x






## [2.8.1](https://github.com/greper/d2-crud/compare/d2-crud-x@2.8.0...d2-crud-x@2.8.1) (2020-08-06)

**Note:** Version bump only for package d2-crud-x





# [2.8.0](https://github.com/greper/d2-crud/compare/d2-crud-x@2.7.3...d2-crud-x@2.8.0) (2020-08-05)


### Features

* 发布 ([37af76c](https://github.com/greper/d2-crud/commit/37af76c91d205e772118aee50f87766b25804274))





## [2.7.3](https://github.com/greper/d2-crud/compare/d2-crud-x@2.7.2...d2-crud-x@2.7.3) (2020-08-05)


### Performance Improvements

* show disabled readonly 支持context参数 ([44e4502](https://github.com/greper/d2-crud/commit/44e4502b76011227a0c511f99d8cb1ca479cc803))
* 行组件disabled方法支持传参 ([1de28b0](https://github.com/greper/d2-crud/commit/1de28b0d9fc426a2483b890ed922890bfcc6179a))





## [2.7.2](https://github.com/greper/d2-crud/compare/d2-crud-x@2.7.0...d2-crud-x@2.7.2) (2020-07-30)


### Bug Fixes

* 修复expand不显示的bug ([072928e](https://github.com/greper/d2-crud/commit/072928e))
* 修复expand不显示的bug ([ba26c48](https://github.com/greper/d2-crud/commit/ba26c48))
* 取消横向拉伸功能，解决对话框文本无法选择的bug ([44ec7d7](https://github.com/greper/d2-crud/commit/44ec7d7))


### Performance Improvements

* 组件独立使用示例 ([5de8d79](https://github.com/greper/d2-crud/commit/5de8d79))






# [2.7.0](https://github.com/greper/d2-crud/compare/d2-crud-x@2.6.1...d2-crud-x@2.7.0) (2020-07-23)


### Features

* 查看功能 ([7d03e94](https://github.com/greper/d2-crud/commit/7d03e94dc2ea6b67211ac554fe2f0ef3d8912a49))





## [2.6.1](https://github.com/greper/d2-crud/compare/d2-crud-x@2.6.0...d2-crud-x@2.6.1) (2020-07-23)


### Bug Fixes

* paginationPrefix还是不能改成flex ([9379761](https://github.com/greper/d2-crud/commit/9379761bfb27ae3f213a310be25f04becf1b347b))


### Performance Improvements

* 增加footer插槽 ([04db82c](https://github.com/greper/d2-crud/commit/04db82c4e6a9a400e54014e4175fc09b3256d272))
* form传递方式改为provide/inject方式 ([158a225](https://github.com/greper/d2-crud/commit/158a225be45aabd5a29de812ea1f00320212a26f))





# [2.6.0](https://github.com/greper/d2-crud/compare/d2-crud-x@2.5.7...d2-crud-x@2.6.0) (2020-07-21)


### Bug Fixes

* 修复vxe-table的一些bug ([0a8a52f](https://github.com/greper/d2-crud/commit/0a8a52fd6d40e47f41502fbe050f8348e30e3377))


### Features

* 实验性支持vxe-table ([9b518c4](https://github.com/greper/d2-crud/commit/9b518c46091a76a3bfc96d9c79ee763a26be9fa2))
* 重大优化 ([9b1009a](https://github.com/greper/d2-crud/commit/9b1009a62383db653ac25f7f83b048dad0a40448))





## [2.5.7](https://github.com/greper/d2-crud/compare/d2-crud-x@2.5.5...d2-crud-x@2.5.7) (2020-07-18)


### Bug Fixes

* 修复空指针异常 ([35e1b7b](https://github.com/greper/d2-crud/commit/35e1b7b71c32fe6c8e5cf3447d366ad7b4a9306b))


### Performance Improvements

* 翻页前后增加插槽 ([c132789](https://github.com/greper/d2-crud/commit/c132789bada13e1d47e0423571fbb58d83c9a9bb))
* 优化对话框拖拽体验 ([fc8132b](https://github.com/greper/d2-crud/commit/fc8132bee2bb43e700d16a69a0074802884dad04))





## [2.5.5](https://github.com/greper/d2-crud/compare/d2-crud-x@2.5.4...d2-crud-x@2.5.5) (2020-07-16)


### Bug Fixes

* 修复一个空指针异常 ([0df235e](https://github.com/greper/d2-crud/commit/0df235e837cc7fd3f9e7603c6d735c1aa6336890))


### Performance Improvements

* 对话框支持横向拉伸 ([45c4cda](https://github.com/greper/d2-crud/commit/45c4cda9b73626f2f0109fee53308614a9ba3804))
* 增加对话框拖拽功能 ([e928f5b](https://github.com/greper/d2-crud/commit/e928f5b06784cf1cd5411c9a253f52f10b0bcfc9))
* helper增加render方式 ([56a2c14](https://github.com/greper/d2-crud/commit/56a2c14f69ab600f8c1ad310e7e6dc4d96ea2618))





## [2.5.4](https://github.com/greper/d2-crud/compare/d2-crud-x@2.5.2...d2-crud-x@2.5.4) (2020-07-13)


### Bug Fixes

* 修复d2Crud与d2CrudX样式冲突的问题 ([b6593ac](https://github.com/greper/d2-crud/commit/b6593ac6f88d65e706f90530438fbe6abe536ec8))
* 修复d2Crud与d2CrudX样式冲突的问题 ([781649e](https://github.com/greper/d2-crud/commit/781649e818607033b61e2fcf522b2311ad6737db))





## [2.5.2](https://github.com/greper/d2-crud/compare/d2-crud-x@2.5.1...d2-crud-x@2.5.2) (2020-07-13)


### Bug Fixes

* 修复d2Crud与d2CrudX样式冲突的问题 ([435c17c](https://github.com/greper/d2-crud/commit/435c17c12b1c343f0ec92e05263e5d2d1531ea3e))





## [2.5.1](https://github.com/greper/d2-crud/compare/d2-crud-x@2.5.0...d2-crud-x@2.5.1) (2020-07-12)


### Performance Improvements

* 示例全部改成新版带toolbar界面 ([6770fc9](https://github.com/greper/d2-crud/commit/6770fc9980ba17083ffb414309ad8f6e15d6dbe1))
* 优化列过滤器 ([3775371](https://github.com/greper/d2-crud/commit/37753713a135d4f019717f14f016c1a12c5990a0))
* 自定义操作按钮还是放到后面来 ([ac6847e](https://github.com/greper/d2-crud/commit/ac6847e4065b9af1d7e01f11aa62e8c545ad95ff))
* extends解除d2crudplus依赖 ([66c5c70](https://github.com/greper/d2-crud/commit/66c5c70bbf505e76296257c56debef0d5855b843))





# [2.5.0](https://github.com/greper/d2-crud/compare/d2-crud-x@2.4.6...d2-crud-x@2.5.0) (2020-07-11)


### Bug Fixes

* 修复rowHandle=false时报警告的问题 ([31730c2](https://github.com/greper/d2-crud/commit/31730c2bb4f163b0d7702b7c695e97a480b8ae0e))


### Features

* 新增工具条功能：刷新，查询展开，页面紧凑切换，列设置。内置分页组件可以启用 ([980ff30](https://github.com/greper/d2-crud/commit/980ff30154453c8b1cd77f19f9efe6f7a20f9bef))





## [2.4.6](https://github.com/greper/d2-crud/compare/d2-crud-x@2.4.3...d2-crud-x@2.4.6) (2020-07-07)


### Bug Fixes

* 增加配置项updateTableDataAfterEdit，保存对话框后不插入数据到table中，通过刷新列表更新数据 ([6ee6f07](https://github.com/greper/d2-crud/commit/6ee6f079f202a0ff053d318c251139d2aa1f0312))


### Performance Improvements

* 对话框确定按钮增加禁用和显示配置 ([eff0736](https://github.com/greper/d2-crud/commit/eff0736a491e6d6bbf4e2ef32e343db82c630674))
* crud-x 打开编辑对话框后发送 dialog-opened事件 ([2d6a4c2](https://github.com/greper/d2-crud/commit/2d6a4c2d1956305b10fe6eac16f9644c4fe31549))
* crud-x 打开编辑对话框后发送 dialog-opened事件 ([eeb12df](https://github.com/greper/d2-crud/commit/eeb12df19a3aa1c031c6196fb4c41cdc65d2ac16))





## [2.4.3](https://github.com/greper/d2-crud/compare/d2-crud-x@2.4.2...d2-crud-x@2.4.3) (2020-07-02)


### Bug Fixes

* 修复获取不到分组中的字段配置的问题 ([2a29a25](https://github.com/greper/d2-crud/commit/2a29a25111252e2a406da6ae97220cb65bea66f5))





## [2.4.2](https://github.com/greper/d2-crud/compare/d2-crud-x@2.4.1...d2-crud-x@2.4.2) (2020-07-01)


### Performance Improvements

* 手动调用addRow方法可以传入默认值 ([59b7a6f](https://github.com/greper/d2-crud/commit/59b7a6f0f33d6cab9fafb3ab7bf02a47007d172c))





## [2.4.1](https://github.com/greper/d2-crud/compare/d2-crud-x@2.4.0...d2-crud-x@2.4.1) (2020-07-01)


### Bug Fixes

* 修复fetchDetail在添加时异常问题 ([18899a4](https://github.com/greper/d2-crud/commit/18899a4760420e0d254f261938cda9c21adc6d99))


### Performance Improvements

* 动态添加分组示例 ([3bc9ccc](https://github.com/greper/d2-crud/commit/3bc9ccc03d2a75eeec9f9fb0e3623a7a4000025a))





# [2.4.0](https://github.com/greper/d2-crud/compare/d2-crud-x@2.3.1...d2-crud-x@2.4.0) (2020-06-30)


### Features

* 表单支持分组 ([96f1b54](https://github.com/greper/d2-crud/commit/96f1b54ff480b95461ac37556eeef66fd925a158))
* 更简单方便易用的组件禁用方式（disabled） ([b194ac1](https://github.com/greper/d2-crud/commit/b194ac1f62d88ffd7d887cb8a56e55a4b5cf2511))


### Performance Improvements

* 优化方法名 ([84766ac](https://github.com/greper/d2-crud/commit/84766acd8799f1238689ab707955eafa3b397ab8))
* 优化列表展示性能 ([96dd2bf](https://github.com/greper/d2-crud/commit/96dd2bff511a704fc29f12d4ed342566396014bf))
* d2-form-item抽取重构 ([aaf3564](https://github.com/greper/d2-crud/commit/aaf35642dcb5ce568a8b8e6fc2bac378bda112de))






## [2.3.1](https://github.com/greper/d2-crud/compare/d2-crud-x@2.3.0...d2-crud-x@2.3.1) (2020-06-25)


### Bug Fixes

* 删除无用的$d2CrudSize配置 ([8de9ef8](https://github.com/greper/d2-crud/commit/8de9ef83c3997442faacf0dcf9327be10357454e))
* 支持自定义d2-crud的标签名称 ([2e61b53](https://github.com/greper/d2-crud/commit/2e61b53d746cda80fc7ed1d63db5c1921b599bb2))






# [2.3.0](https://github.com/greper/d2-crud/compare/d2-crud-x@2.2.4...d2-crud-x@2.3.0) (2020-06-24)


### Bug Fixes

* 修复自定义按钮获取不到行数据的bug ([ca5a82e](https://github.com/greper/d2-crud/commit/ca5a82e2e79d14e13e45e8adafbdeed80a6533c5))
* 修复cell-data-change事件 ([304a242](https://github.com/greper/d2-crud/commit/304a24271e6c8085c77655c4aea7e5ed66040051))
* 修复slot方式修改数组数据会把行数据也改掉的bug ([bd8f14f](https://github.com/greper/d2-crud/commit/bd8f14f8d069d1335629cc3a044379102ad69bb8))


### Features

* 对话框全屏，标题slot ([2bd3dec](https://github.com/greper/d2-crud/commit/2bd3decf4816502c7413afa6106e3cb746846eb4))
* 对话框增加自定义header slot ([0c25a93](https://github.com/greper/d2-crud/commit/0c25a93e85f91b34c2cc2e6f5883e1ab284cbb0c))
* 支持d2-column递归组件 ([b536e21](https://github.com/greper/d2-crud/commit/b536e21a94e399ac403a24e8d5910000510c42a5))
* d2-crud多级表头重构,抽取d2-cell组件 ([0a11bf5](https://github.com/greper/d2-crud/commit/0a11bf5d5116bdb74cf33129e04efac0d53bb154))


### Performance Improvements

* 优化提交form ([90dab6b](https://github.com/greper/d2-crud/commit/90dab6bf6725ceb4dd22f8a0a664b000c4e9ef66))






## [2.2.4](https://github.com/greper/d2-crud/compare/d2-crud-x@2.2.3...d2-crud-x@2.2.4) (2020-06-17)


### Performance Improvements

* jsx示例 ([137f745](https://github.com/greper/d2-crud/commit/137f7458bdc37b36b18b9f60df67011fb4c9ab60))





## [2.2.3](https://github.com/greper/d2-crud/compare/d2-crud-x@2.2.2...d2-crud-x@2.2.3) (2020-06-16)


### Performance Improvements

* 行编辑演示 ([aec224f](https://github.com/greper/d2-crud/commit/aec224f87f1a41811d48205280c84c48cb7044a2))





## [2.2.2](https://github.com/greper/d2-crud/compare/d2-crud-x@2.2.1...d2-crud-x@2.2.2) (2020-06-12)

**Note:** Version bump only for package d2-crud-x





## [2.2.1](https://github.com/greper/d2-crud/compare/d2-crud-x@2.2.0...d2-crud-x@2.2.1) (2020-06-08)

**Note:** Version bump only for package d2-crud-x





# [2.2.0](https://github.com/greper/d2-crud/compare/d2-crud-x@2.1.0...d2-crud-x@2.2.0) (2020-06-08)


### Bug Fixes

* 增加选项的禁用配置，增加dictSwitch,部分ie兼容性问题修复 ([c91a04b](https://github.com/greper/d2-crud/commit/c91a04bbdd201d117953048c56cca53ae66dad0d))


### Features

* 自定义事件监听支持 ([1f9fd39](https://github.com/greper/d2-crud/commit/1f9fd39316375c6102279e1a7a65b33ae16a4733))





# [2.1.0](https://github.com/greper/d2-crud/compare/d2-crud-x@2.1.0-0...d2-crud-x@2.1.0) (2020-06-04)


### Bug Fixes

* 修复文件上传进度条显示的bug，优化一些其他显示上的问题 ([53d54ba](https://github.com/greper/d2-crud/commit/53d54bad45782ddc7a6970ad25c2811e137ff41b))






# 2.1.0-0 (2020-06-03)


### Features

* dict配置增加覆盖全局getRemoteDataFunc的方法，全局方法增加dict参数 ([22db385](https://github.com/greper/d2-crud/commit/22db38591d7c285b0e50ce8b9cd6aedd0c5032f9))
