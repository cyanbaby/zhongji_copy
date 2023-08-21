# [一个由line-height引发的血案与思考](https://juejin.cn/post/6844903613018423303)
> 老大不喜欢css的共同作用机制和效果，掌握它以魔法打败魔法

推荐：todo 待验证， normalize.css设置line-height默认为1.15

文中图片，简要解释为如下几点：
1. 我们设置font-size的高度实际上是对应字体的EM square部分
2. 字体在设计时可以超出EM square部分
3. 字体实际设计与EM square部分一致时，line-height:normal与line-height:1相等
4. 从上图中可以看到，ascender+descender>Em Size 即1100+540>1000,此时line-height:1.64,所以100px的文字默认的行高为164px  

演示windows环境下默认字体微软雅黑：
1. line-height:normal的值跟字体有关系，相同字体在不同环境也不一样
2. 当line-height设置的值小于默认的值时就会存在显示不全的问题
3. normalize.css设置line-height默认为1.15，当字体line-height的normal大于1.15就会存在文字显示不全的问题
4. 要解决字体在不同平台line-height不一致的问题，需根据具体字体，选择normal在不同平台上的最大值设置

## todo
FontForge 软件入门下，方便学习css

## 其他文献
* [todo 【css】探究font-size、文本实际高度、line-height之间的关系](https://blog.csdn.net/w390058785/article/details/96832707)
* [todo 深入理解CSS：字体规格，line-height 和 vertical-align](https://chaosflutter.com/posts/css/css-font-metrics-line-height-and-vertical-align/)


## lineheight-test(已删除合并到当前README.md)内容
[真的理解font-size和line-height了吗？ 概念解释的很清楚](https://juejin.cn/post/6971673576017494053)
* fontsize 的值不代表字体高度，也不代表的字体内容（content-area）高度
* 字体内容（content-area）高度 与 font-size 和 font-family 相关


[行高图片](https://juejin.cn/post/6844903618059960333#heading-6)
[todo 浏览器或者html版本不对，待解决问题 滴滴团队](https://juejin.cn/post/6844903709730668552#heading-0)


## todo
* 概念很多 很复杂的时候，各个作者的输出都需要保留怀疑
* line-height 与 font 的使用顺序问题
* font-size单位使用不同的重点区别
* 幽灵节点位置
* 基线如何确认： 包含盒子基线？ 行框盒子基线？ 空白的inline-block的基线？
  * 单行  行内框盒子的基线？
  * 多行  对于有内容的inline-block，其基线为最后一行文本基线

[彻底搞定vertical-align垂直居中不起作用疑难杂症](https://juejin.cn/post/6844903561780789255)
* 文内搜索 "content area: 围绕文字看不见的box，其大小与font-size有关，其高度可以认为鼠标选中文字时背景色的高度"
* 文内搜索 "inline-block基线" 理解了设置line-height操作之后的细节
* 文内搜索 "文字下沉特性"
* 文内搜索 "利用空白节点这个特性，以及行高和vertical-align的关系，我们可以做一些实际的应用。"
* 文内搜索 "为什么是近似垂直居中"


四种内联盒子
*                  containing box：   包含盒子/外层盒子
* line box      OR   line boxes:      行框盒子
* inline box    OR   inline boxes：   内联盒子(行内框) 
*                    content area：   内容区域
                 
line-height值为1.5,150%和1.5em的区别
> 文章里有demo
> 当前目录demo残缺不用管，文章内容很细致，能理解实践即可
* line-height具有继承性
* 几个属性的区别在于1.5是在子级继承后会重新根据自身的字体大小重新计算行高值
* 而*1.5em和150%则会在父级计算完行高值后，原封不动的作用于子级元素。