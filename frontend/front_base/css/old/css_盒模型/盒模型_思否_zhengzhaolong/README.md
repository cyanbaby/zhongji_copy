# [深入理解css盒子模型](https://segmentfault.com/a/1190000014692461)
todo 本文引出了《css世界》
todo 先去看书再回来看此篇文章吧

## 内联盒模型
内容区域(content area)  
内联盒子(inline box)  
行框盒子(line box)  
包含盒子(containing box)  

## width
fill-available：充分利用可用空间，例如div、p这些元素的宽度是默认100%于父级容器的。  
但是width: auto却不同于width: 100%，这是很多人不理解的地方。

如果你设置了width: 100%，这里指的是内容区域100%，即css3中的content-box，这时如果你设置了padding、border或者margin，元素都会撑破父元素，从而破坏布局。  

你当然可以设置box-sizing: border-box，但可惜的是css3中没有margin-box，这时候你如果设置了margin，依然会撑破父元素，但是width: auto却不会  


width的默认值是auto，但很多人却都不理解这个值是什么意思，因为auto在不同场景会有不同的表现：  
fill-available  
fit-content  
min-content  
max-content  