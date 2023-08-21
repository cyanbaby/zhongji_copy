# d2p-images-format

## Props

<!-- @vuese:d2p-images-format:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|图片的url'url' 或 ['url1','url2']|`String` / `Array`|`false`|-|
|width|图片的宽度设置|—|`false`|30|
|height|图片的高度设置|—|`false`|30|
|fit|-|—|`false`|'contain'|
|elProps|内部封装[el-image](https://element.eleme.cn/#/zh-CN/component/image)组件的属性参数<br/>|`Object`|`false`|-|
|error|-|—|`false`|undefined|
|buildUrl|构建下载url方法|`Function`|`false`|function (value, item) {
  return value;
}|

<!-- @vuese:d2p-images-format:props:end -->


## Slots

<!-- @vuese:d2p-images-format:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|error|-|-|

<!-- @vuese:d2p-images-format:slots:end -->


