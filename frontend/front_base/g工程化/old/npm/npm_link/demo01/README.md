# [你不知道的 npm link](https://www.bilibili.com/video/BV1wb4y1C76w?spm_id_from=333.337.search-card.all.click&vd_source=0efa2f40d2b0373aa1de4b8c7c1a372f)


创建软链接包(本地一个位置，创建到全局)
cd source
npm link

查看全局包路径  
npm config get prefix

在项目中删除link
cd project
npm unlink project


在源位置删除(删除全局包)
cd source
npm unlink

## todo
npm link source 不会对project里的package.json造成影响