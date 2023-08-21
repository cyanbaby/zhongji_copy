<template>
  <div class="demo-container">
    <div class="color-box">
      <dl>
        <dt>深色</dt>
        <dd>色号: {{ darkColor }}</dd>
        <dd
          style="width: 100px; height: 100px"
          :style="{
            'background-color': darkColor,
          }"
          class="color-ract"
        />
      </dl>
      <dl>
        <dt>原色</dt>
        <dd>色号: {{ defaultColor }}</dd>
        <dd
          style="width: 100px; height: 100px"
          :style="{
            'background-color': defaultColor,
          }"
          class="color-ract"
        />
      </dl>
      <dl>
        <dt>浅色</dt>
        <dd>色号: {{ lightColor }}</dd>
        <dd
          style="width: 100px; height: 100px"
          :style="{
            'background-color': lightColor,
          }"
          class="color-ract"
        />
      </dl>
    </div>
    <div class="action-box">
      <dl>
        <dt>操作</dt>
        <dd>
          <el-button @click="changeDarkColor">转换深色</el-button>
          <el-button @click="changeLightColor">转换浅色</el-button>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
// var color1 = getDarkColor('#0068FF', 0.2)
// console.info(color1)

// var color2 = getLightColor('#0068FF', 0.4)
// console.info(color2)

// hex颜色转rgb颜色
function HexToRgb(str) {
  var r = /^\#?[0-9A-F]{6}$/
  // test方法检查在字符串中是否存在一个模式，如果存在则返回true，否则返回false
  if (!r.test(str)) return window.alert('输入错误的hex')
  // replace替换查找的到的字符串
  str = str.replace('#', '')
  // match得到查询数组
  var hxs = str.match(/../g)
  // alert('bf:'+hxs)
  for (var i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16)
  // alert(parseInt(80, 16))
  // console.log(hxs);
  return hxs
}
// GRB颜色转Hex颜色
function RgbToHex(a, b, c) {
  var r = /^\d{1,3}$/
  if (!r.test(a) || !r.test(b) || !r.test(c)) { return window.alert('输入错误的rgb颜色值') }
  var hexs = [a.toString(16), b.toString(16), c.toString(16)]
  for (var i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = '0' + hexs[i]
  return '#' + hexs.join('')
}

// 得到hex颜色值为color的加深颜色值，level为加深的程度，限0-1之间
function getDarkColor(color, level) {
  var r = /^\#?[0-9A-F]{6}$/
  if (!r.test(color)) return
  var rgbc = HexToRgb(color)
  // floor 向下取整
  for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level))
  return RgbToHex(rgbc[0], rgbc[1], rgbc[2])
}
// 得到hex颜色值为color的减淡颜色值，level为加深的程度，限0-1之间
function getLightColor(color, level) {
  var r = /^\#?[0-9A-F]{6}$/
  if (!r.test(color)) return
  var rgbc = HexToRgb(color)
  for (var i = 0; i < 3; i++) { rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]) }
  return RgbToHex(rgbc[0], rgbc[1], rgbc[2])
}
export default {
  name: 'Base2',
  data() {
    return {
      darkColor: '',
      // defaultColor: '#00AFC5',
      defaultColor: '#4598F9',
      lightColor: ''
    }
  },
  methods: {
    changeDarkColor() {
      this.darkColor = getDarkColor(this.defaultColor, 0.2)
    },
    changeLightColor() {
      this.lightColor = getLightColor(this.defaultColor, 0.2)
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-container {
  .color-box {
    display: flex;
    dl {
      flex: 1;
      .color-ract {
        border: 1px solid #d9d9d9;
      }
    }
  }
}
</style>
