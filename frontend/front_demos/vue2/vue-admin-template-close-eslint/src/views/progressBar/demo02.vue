<template>
  <em>{{ numvalue }}
  </em>
</template>
<script>
export default {
  props: ['val'],
  data() {
    return { oldvalue: 0, numvalue: 0 }
  },
  methods: {
    numFun(startNum, maxNum) {
      var that = this
      let numText = startNum;
      let addnum = Math.floor((maxNum - startNum) / 10) // 10代表数字变化时最大跳动次数
      let golb; // 为了清除requestAnimationFrame
      function numSlideFun() { // 数字动画
        numText += addnum; // 速度的计算可以为小数 。数字越大，滚动越快
        if (numText >= maxNum) {
          numText = maxNum;
          cancelAnimationFrame(golb);
        } else {
          setTimeout(function () {
            golb = requestAnimationFrame(numSlideFun);
          }, 200) // 200代表翻牌的频率
        }
        that.numvalue = numText
        // console.log(numText)
      }
      function subtractlideFun() { // 数字动画
        numText += addnum; // 速度的计算可以为小数 。数字越大，滚动越快
        if (maxNum >= numText) {
          numText = maxNum;
          cancelAnimationFrame(golb);
        } else {
          setTimeout(function () {
            golb = requestAnimationFrame(subtractlideFun);
          }, 200);
        }
        that.numvalue = numText
        // console.log(numText)
      }
      if (startNum < maxNum) {
        numSlideFun(); // 递增数字翻牌
      } else {
        subtractlideFun(); // 递减数字翻牌
      }
    }

  },
  watch: {
    val(value) {
      if (value === undefined) {
        this.numvalue = 0
        this.oldvalue = value
      } else {
        if (this.oldvalue === 0) {
          this.numvalue = value;
          this.oldvalue = value
        } else {
          this.numFun(this.oldvalue, value)
          this.oldvalue = value
        }
      }
    }
  }
}
</script>
