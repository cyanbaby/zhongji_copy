

# [30分钟学会Flex布局](https://zhuanlan.zhihu.com/p/25303493)
todo 兼容 IE 低版本浏览器布局方案  CSS
[IE浏览器兼容方法+几种网页布局](https://juejin.cn/post/7007801910728065038)
[浏览器兼容（CSS部分）]()

# Demo

## Flex 容器：
```css
.container {
    display: flex | inline-flex;       //可以有两种取值
}
```
有下面六种属性可以设置在容器上，它们分别是：  
flex-direction  
flex-wrap  
flex-flow  
justify-content  
align-items  
align-content  

**需要注意的是：当时设置 flex 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。**

### demo01 flex-direction: 决定主轴的方向(即项目的排列方向)

### demo02 flex-wrap: 决定容器内项目是否可换行
demo02_01  
* flex-wrap  默认值：nowrap 不换行，即当主轴尺寸固定时，当空间不足时，项目尺寸会随之调整而并不会挤到下一行。

demo02_02  
* wrap：项目主轴总尺寸超出容器时换行，第一行在上方

demo02_03  
* wrap-reverse：换行，第一行在下方

### demo03 flex-flow: flex-direction 和 flex-wrap 的简写形式
```css
/* flex-flow: flex-direction 和 flex-wrap 的简写形式 */
.container {
    flex-flow: <flex-direction> || <flex-wrap>;
}
/* 默认值为: row nowrap，感觉没什么卵用，老老实实分开写就好了。这样就不用记住这个属性了。 */
```

### demo04 justify-content：定义了项目在主轴的对齐方式。
```css
.container {
    justify-content: flex-start | flex-end | center | space-between | space-around;
}
```
**建立在主轴为水平方向时测试，即 flex-direction: row**

demo04_01
flex-start 默认值

demo04_02
flex-end

demo04_03
center 居中

demo04_04
space-between：两端对齐，项目之间的间隔相等，即剩余空间等分成间隙。

demo04_05
space-around：每个项目两侧的间隔相等，所以项目之间的间隔比项目与边缘的间隔大一倍。

### demo05 align-items: 定义了项目在交叉轴上的对齐方式
```css
.container {
    align-items: flex-start | flex-end | center | baseline | stretch;
}
```
**建立在主轴为水平方向时测试，即 flex-direction: row**


demo05_01
默认值为 stretch 即如果项目未设置高度或者设为 auto，将占满整个容器的高度。

demo05_02
flex-start：交叉轴的起点对齐

demo05_03
flex-end：交叉轴的终点对齐

demo05_04
center：交叉轴的中点对齐

demo05_05
baseline: 项目的第一行文字的基线对齐 ×，我觉得它说的不对，应该是跟line-height最高的项目的基线对齐

### demo06 align-content: 定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用
```css
.container {
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

demo06_01
stretch  默认值    当值为 stretch 时会三条轴线平分容器的垂直方向上的空间。        三行垂直间距分分
值得注意的是，虽然在每条轴线上项目的默认值也为 stretch， 注释掉.c1~.c9的高度       三行高度平方拉伸



demo06_02
flex-start：轴线全部在交叉轴上的起点对齐    注释掉.c1~.c9的高度       三行高度，每行取最高


demo06_03
flex-end：轴线全部在交叉轴上的终点对齐      注释掉.c1~.c9的高度       三行高度，每行取最高


demo06_04
center：轴线全部在交叉轴上的中间对齐       注释掉.c1~.c9的高度       三行高度，每行取最高


demo06_05
space-between：轴线两端对齐，之间的间隔相等，即剩余空间等分成间隙。   注释掉.c1~.c9的高度       三行高度，每行取最高

demo06_06
space-around：每个轴线两侧的间隔相等，所以轴线之间的间隔比轴线与边缘的间隔大一倍。   注释掉.c1~.c9的高度       三行高度，每行取最高

## Flex 项目属性：
有六种属性可运用在 item 项目上：  
order  
flex-basis  
flex-grow  
flex-shrink  
flex  
align-self  

### order: 定义项目在容器中的排列顺序，数值越小，排列越靠前，默认值为 0
```css
.item {
    order: <integer>;
}
```
demo07_01
-2排在-1前， 其他默认是0

### flex-basis: 定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间
默认值：auto，即项目本来的大小, 这时候 item 的宽高取决于 width 或 height 的值。  
当主轴为水平方向的时候，当设置了 flex-basis，项目的宽度设置值会失效，flex-basis 需要跟 [flex-grow - 倍数](https://www.runoob.com/cssref/css3-pr-flex-grow.html) 和 [flex-shrink - 等份](https://www.runoob.com/cssref/css3-pr-flex-shrink.html) 配合使用才能发挥效果。
* 当 flex-basis 值为 0 % 时，是把该项目视为零尺寸的，故即使声明该尺寸为 140px，也并没有什么用。
* 当 flex-basis 值为 auto 时，则跟根据尺寸的设定值(假如为 100px)，则这 100px 不会纳入剩余空间。

[flex-basis - todo 更深的用意](https://www.runoob.com/cssref/css3-pr-flex-basis.html)

### flex-grow和flex-shrink略
flex-grow默认值为 0  当所有的项目都以 flex-basis 的值进行排列后，仍有剩余空间，那么这时候 flex-grow 就会发挥作用了。 
* 如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间。(如果有的话)
* 如果一个项目的 flex-grow 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。


当然如果当所有项目以 flex-basis 的值排列完后发现空间不够了，且 flex-wrap：nowrap 时，此时 flex-grow 则不起作用了，这时候就需要接下来的这个属性 flex-shrink。  

flex-shrink
flex-shrink默认值: 1，即如果空间不足，该项目将缩小，负值对该属性无效。
todo ..

